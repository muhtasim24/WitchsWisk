import { NextRequest, NextResponse } from "next/server";
import { checkoutCart } from "@/lib/cart";

export async function POST(request: NextRequest) {
    const { userId } = await request.json();
    const checkout = await checkoutCart(userId)
    return NextResponse.json(checkout);

}