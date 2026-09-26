import { NextRequest, NextResponse } from "next/server";
import { checkoutCart } from "@/lib/cart";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
    const rawBody = await request.text();
    const stripeSignature = request.headers.get('stripe-signature') as string;
    const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {
        const event = stripe.webhooks.constructEvent(rawBody, stripeSignature, webHookSecret);
        if (event.type == "checkout.session.completed") {
            const data = event.data.object
            const paymentStatus = data.payment_status
            const session_id = data.id;
            if (paymentStatus === "paid") {
                const supabase = supabaseAdmin;
                const {data: existingOrder, error} = await supabase.from('orders').select('id, order_items(id)').eq('stripe_session_id', session_id).maybeSingle();

                if (error) {
                    console.log(error);
                    return NextResponse.json({ message: 'Database error' }, { status: 500 });
 
                }

                if (existingOrder && existingOrder.order_items.length > 0) {
                    return NextResponse.json({message: `Order Already Processed`}, {status: 200});
                }
                

                if (!existingOrder) {
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

                    const subTotal = data.amount_subtotal;
                    const totalPrice = data.amount_total ? data.amount_total / 100 : 0;

                    const checkout = await checkoutCart(userId, fullAddress, fullName, userEmail, totalPrice, session_id);
                    return NextResponse.json(checkout);
                }
            }    
        } 
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        // On error, log and return the error message.
        if (err! instanceof Error) console.log(err);
        console.log(`Error message: ${errorMessage}`);
        return NextResponse.json(
            {message: `Webhook Error: ${errorMessage}`},
            {status: 400}
            );
    }

    

    // need to verify webhook signature 
    // construct an event - this will handle the verifcation, need (raw body, stripe signature, webhook secret key)
    // https://docs.stripe.com/webhooks#webhook-endpoint-def
    // quick status successful code 2xx beofre any complex logic
    // return 200x response

    // idempotency
    // create new column in orders table, put in sessionId or objectid not sure yet
    // when we reach our event type checkout session complete
    // check our db to see if objcetID is alreayd in table if it is do ntohign, if its not we can create new order

    
    return NextResponse.json({message: 'Received'}, {status: 200});

}