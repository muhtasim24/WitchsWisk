import { NextRequest, NextResponse } from "next/server";
import { checkoutCart } from "@/lib/cart";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
    const rawBody = request;
    console.log("RAW", rawBody);
    const response  = await request.json();
    // need to verify webhook signature 
    // construct an event - this will handle the verifcation, need (raw body, stripe signature, webhook secret key)
    // https://docs.stripe.com/webhooks#webhook-endpoint-def
    // quick status successful code 2xx beofre any complex logic
    // return 200x response

    // idempotency
    // create new column in orders table, put in sessionId or objectid not sure yet
    // when we reach our event type checkout session complete
    // check our db to see if objcetID is alreayd in table if it is do ntohign, if its not we can create new order


    if (response.type == "checkout.session.completed") {
        const data = response.data.object
        console.log(response);
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
    } 't=1789443760,v1=83a3bd1908aaab3b9af95a0357ddabda27e23cbd8f2b1ad2090cb38abadf9ac3,v0=bf817677a7d511dde745d205054d986954f602ab40111169f84e351ba4b611f4'
    
    return NextResponse.json(response);

}