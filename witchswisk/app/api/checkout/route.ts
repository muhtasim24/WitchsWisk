import { NextRequest, NextResponse } from "next/server";
import { checkoutCart } from "@/lib/cart";

export async function POST(request: NextRequest) {
    const { userId, address, fullName } = await request.json();
    const checkout = await checkoutCart(userId, address, fullName)
    return NextResponse.json(checkout);

}