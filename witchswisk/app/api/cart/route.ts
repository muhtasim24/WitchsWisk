import { addToCart, deleteFromCart, getCart } from "@/lib/cart";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    console.log("API GET")
    return NextResponse.json(getCart());
}

export async function POST(request: NextRequest) {
    const { id } = await request.json();
    const updatedCart = addToCart(id)
    return NextResponse.json(updatedCart);

}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    const updatedCart = deleteFromCart(id);
    return NextResponse.json(updatedCart);
}