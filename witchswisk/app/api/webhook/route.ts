import { NextRequest, NextResponse } from "next/server";
import { checkoutCart } from "@/lib/cart";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
    const rawBody = await request.text();
    const stripeSignature = request.headers.get('stripe-signature') as string;
    const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {
        const event = stripe.webhooks.constructEvent(rawBody, stripeSignature, webHookSecret);
        console.log("WEBHOOK EVENT", event);
        if (event.type == "checkout.session.completed") {
            const data = event.data.object
            
            const address = data.collected_information.shipping_details.address
            const fullAddress = address.line1 + ' ' + address.city + ' ' + address.state + ' ' + address.postal_code + ' ' + address.country
            const fullName = data.collected_information.shipping_details.name;
            const userEmail = data.customer_email;
            const userId = data.metadata.user_id;
            const paymentStatus = data.payment_status
            const subTotal = data.amount_subtotal
            const totalPrice = data.amount_total / 100

            console.log("SUBTOTAL", subTotal / 100);
            console.log("TOTAL PRICE", totalPrice);

            if (paymentStatus === "paid") {
                const checkout = await checkoutCart(userId, fullAddress, fullName, userEmail, totalPrice)
                return NextResponse.json(checkout);
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


    // if (response.type == "checkout.session.completed") {
    //     const data = response.data.object
    //     console.log(response);
    //     const address = data.collected_information.shipping_details.address
    //     const fullAddress = address.line1 + ' ' + address.city + ' ' + address.state + ' ' + address.postal_code + ' ' + address.country
    //     const fullName = data.collected_information.shipping_details.name;
    //     const userEmail = data.customer_email;
    //     const userId = data.metadata.user_id;
    //     const paymentStatus = data.payment_status
    //     const subTotal = data.amount_subtotal
    //     const totalPrice = data.amount_total / 100

    //     console.log("SUBTOTAL", subTotal / 100);
    //     console.log("TOTAL PRICE", totalPrice);

    //     if (paymentStatus === "paid") {
    //         const checkout = await checkoutCart(userId, fullAddress, fullName, userEmail, totalPrice)
    //         return NextResponse.json(checkout);
    //     }        
    // } 
    
    return NextResponse.json({message: 'Received'}, {status: 200});

}