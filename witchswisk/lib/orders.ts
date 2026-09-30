import { createServerSupabase } from "./supabase/server";
import { Order } from "./types";


export async function getOrder(): Promise<Order[]> {
    const supabase = await createServerSupabase();

    const { data: { user }} = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false});
    if (error || !data) {
        console.error(error);
        return [];
    }

    return data;
}

export async function updateOrderStatus(id: string, newStatus: string): Promise<Order> {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq("id", id)
        .select()
        .maybeSingle();

    if (error) {
        console.error(error);
        throw error;
    }

    if (!data) {
        throw new Error(`No order found with id ${id}`);
    }

    return data;
}