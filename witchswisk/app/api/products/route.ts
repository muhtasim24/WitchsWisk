import { getProducts, updateInStockProduct } from "@/lib/getProducts";
import { createServerSupabase } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    const products = await getProducts();
    return new Response(JSON.stringify(products), {
        status: 200,
        headers: {"Content-Type": "application/json"},
    });
}

export async function PATCH(request: NextRequest){
    const supabase = await createServerSupabase();
    const { data: { user }} = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase.from('users').select('is_admin').eq('id', user.id).maybeSingle();
    if (!profile?.is_admin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const {id, in_stock} = await request.json()

    const updateInStock = await updateInStockProduct(id, in_stock);
    return NextResponse.json(updateInStock);
}