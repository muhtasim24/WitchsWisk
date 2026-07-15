import { createServerSupabase } from "./supabase/server";


export async function getOrder() {
    const supabase = await createServerSupabase();

    const { data: { user }} = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase.from('orders').select('*').eq('user_id', user.id);
    console.log(data);
    
    if (error || !data) {
        console.error(error);
        return [];
    }

    return data;
}

export async function getOrderReciept() {

}

