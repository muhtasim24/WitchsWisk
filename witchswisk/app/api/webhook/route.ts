import { NextRequest, NextResponse } from "next/server";
import { checkoutCart } from "@/lib/cart";

export async function POST(request: NextRequest) {
    const { userId, address, fullName, userEmail } = await request.json();
    const checkout = await checkoutCart(userId, address, fullName, userEmail)
    return NextResponse.json(checkout);

}