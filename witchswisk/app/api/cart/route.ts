import { addToCart, decreaseQuantity, deleteFromCart, getCart, increaseQuantity } from "@/lib/cart";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function errorResponse(error: unknown) {
    // Supabase errors are plain objects, not always Error instances
    const message = (error as { message?: string })?.message ?? "Unknown error";

    if (message === "Unauthorized") {
        return NextResponse.json({ error: message }, { status: 401 });
    }
    if (message === "Out of stock") {
        return NextResponse.json({ error: message }, { status: 409 });
    }
    console.error("Cart API error:", error);
    return NextResponse.json({ error: "Cart update failed" }, { status: 500 });
}

async function parseId(request: NextRequest) {
    const body = await request.json().catch(() => null);
    const id = Number(body?.id);
    if (!Number.isInteger(id)) return null;
    return { id, body} ;
}

export async function GET() {
    try {
        const cart = await getCart();
        return NextResponse.json(cart);
    } catch (error) {
        return errorResponse(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        const parsed = await parseId(request);
        if (!parsed) return NextResponse.json( { error: "Invalid id"} , { status: 400 });
        return NextResponse.json(await addToCart(parsed.id));
    } catch (error) {
        return errorResponse(error);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const parsed = await parseId(request);
        if (!parsed) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
        return NextResponse.json(await deleteFromCart(parsed.id));
    } catch (error) {
        return errorResponse(error);
    }
}

// for patch I think i should send an id , and a string
// cause if the string is increasing then i call increase function and vice versa
export async function PATCH(request: NextRequest){
    try {
        const parsed = await parseId(request);
        if (!parsed) return NextResponse.json( { error: "Invalid id"}, { status: 400});

        const { action } = parsed.body;
        if (action !== "increasing" && action != "decreasing") {
            return NextResponse.json( { error: "Invalid action"}, { status: 400});
        }

        if (action === "increasing") {
            const updatedCart = await increaseQuantity(parsed.id);
            return NextResponse.json(updatedCart);
        } else {
            const updatedCart = await decreaseQuantity(parsed.id);
            return NextResponse.json(updatedCart);
        }
    } catch (error) {
        return errorResponse(error);
    }

}