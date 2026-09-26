import { NextRequest, NextResponse } from "next/server";
import { checkoutCart } from "@/lib/cart";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
    const rawBody = await request.text();
    const stripeSignature = request.headers.get('stripe-signature') as string;
    const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, stripeSignature, webHookSecret);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.log(`Webhook signature verification failed: ${errorMessage}`);
        return NextResponse.json({ message: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const data = event.data.object;
                const paymentStatus = data.payment_status;
                const session_id = data.id;

                if (paymentStatus !== "paid") {
                    console.log(`Session ${session_id} completed but payment status is "${paymentStatus}"`);
                    return NextResponse.json({ message: 'Payment not yet completed' }, { status: 200 });
                }

                const supabase = supabaseAdmin;
                const { data: existingOrder, error } = await supabase
                    .from('orders')
                    .select('id, order_items(id)')
                    .eq('stripe_session_id', session_id)
                    .maybeSingle();

                if (error) {
                    console.log(error);
                    return NextResponse.json({ message: 'Database error' }, { status: 500 });
                }

                if (existingOrder && existingOrder.order_items.length > 0) {
                    return NextResponse.json({ message: 'Order already processed' }, { status: 200 });
                }

                const shippingDetails = data.collected_information?.shipping_details;
                const address = shippingDetails?.address;
                const fullName = shippingDetails?.name;
                const userEmail = data.customer_email;
                const userId = data.metadata?.user_id;

                if (!address || !fullName || !userEmail || !userId) {
                    console.log("Missing required order data", { address, fullName, userEmail, userId });
                    return NextResponse.json({ message: 'Missing required checkout data' }, { status: 400 });
                }

                const fullAddress = `${address.line1} ${address.city} ${address.state} ${address.postal_code} ${address.country}`;
                const totalPrice = data.amount_total ? data.amount_total / 100 : 0;

                const checkout = await checkoutCart(userId, fullAddress, fullName, userEmail, totalPrice, session_id);

                // checkoutCart returns either the created order data, or an error/undefined on failure
                if (!checkout || (checkout as { code?: string }).code) {
                    console.log(`checkoutCart failed for session ${session_id}`, checkout);
                    return NextResponse.json({ message: 'Order processing failed' }, { status: 500 });
                }

                console.log(`Order created for session ${session_id}`);
                return NextResponse.json({ message: 'Order created' }, { status: 200 });
            }

            case "checkout.session.async_payment_failed": {
                const data = event.data.object;
                console.log(`Async payment failed for session ${data.id}`);
                // future: notify the customer, mark something as failed, etc.
                return NextResponse.json({ message: 'Payment failure noted' }, { status: 200 });
            }

            case "checkout.session.expired": {
                const data = event.data.object;
                console.log(`Session expired: ${data.id}`);
                return NextResponse.json({ message: 'Expiry noted' }, { status: 200 });
            }

            default: {
                console.log(`Unhandled event type: ${event.type}`);
                return NextResponse.json({ message: 'Unhandled event type' }, { status: 200 });
            }
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.log(err);
        console.log(`Error message: ${errorMessage}`);
        return NextResponse.json({ message: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }
}