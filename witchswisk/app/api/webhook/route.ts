import { NextRequest, NextResponse } from "next/server";
import { checkoutCart } from "@/lib/cart";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
    const response  = await request.json();

    if (response.type == "checkout.session.completed") {
        const data = response.data.object
        console.log(response);
        console.log("GIVE ME SHIPPING", response.data.object.collected_information);
        const address = data.collected_information.shipping_details.address
        const fullAddress = address.line1 + ' ' + address.city + ' ' + address.state + ' ' + address.postal_code + ' ' + address.country
        console.log("FULL ADDRESS", fullAddress);
        const fullName = data.collected_information.shipping_details.name;
        const userEmail = data.customer_email;
        const userId = data.metadata.user_id;
        const paymentStatus = data.payment_status

        if (paymentStatus === "paid") {
            const checkout = await checkoutCart(userId, fullAddress, fullName, userEmail)
            return NextResponse.json(checkout);
        }        
    } 
    
    return NextResponse.json(response);

}