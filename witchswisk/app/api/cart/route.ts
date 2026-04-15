import { addToCart, decreaseQuantity, deleteFromCart, getCart, increaseQuantity } from "@/lib/cart";
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

// for patch I think i should send an id , and a string
// cause if the string is increasing then i call increase function and vice versa
export async function PATCH(request: NextRequest){
    const {id, action} = await request.json();
    if (action === "increasing") {
        const updatedCart = increaseQuantity(id);
        return NextResponse.json(updatedCart);
    } else {
        const updatedCart = decreaseQuantity(id);
        return NextResponse.json(updatedCart);
    }

}