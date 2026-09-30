import { sendOrderStatusUpdate } from "@/lib/email";
import { updateOrderStatus } from "@/lib/orders";
import { createServerSupabase } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";


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

    const {id, newStatus} = await request.json()

    const updateStatus = await updateOrderStatus(id, newStatus);
    console.log("IN API FOR ORDER PATCH");

    // SEND CONFIRMATION EMAIL
    try {
        await sendOrderStatusUpdate(id, newStatus);
    } catch (err) {
        console.log(`Failed to send status update email for order ${id}:`, err);
    }
    
    return NextResponse.json(updateStatus);
}