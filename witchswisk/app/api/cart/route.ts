import { addToCart, getCart } from "@/lib/cart";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    console.log("API GET")
    return NextResponse.json(getCart());
}

export async function POST(request: NextRequest) {
    const item = await request.json();
    console.log("API POST:", item);
    const updatedCart = addToCart(item)
    return NextResponse.json(updatedCart);

}