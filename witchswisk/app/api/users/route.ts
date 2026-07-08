import { addToCart, decreaseQuantity, deleteFromCart, getCart, increaseQuantity } from "@/lib/cart";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    console.log("API GET")
    const cart = await getCart();
    return NextResponse.json(cart);
}