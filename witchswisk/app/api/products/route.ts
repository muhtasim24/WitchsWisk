import { getProducts } from "@/lib/getProducts";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    const products = await getProducts();
    return new Response(JSON.stringify(products), {
        status: 200,
        headers: {"Content-Type": "application/json"},
    });
}

export async function PATCH(request: NextRequest) {
    return NextResponse;
}