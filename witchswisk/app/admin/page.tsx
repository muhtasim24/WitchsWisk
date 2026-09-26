import { getProducts } from "@/lib/getProducts";
import { getOrder } from "@/lib/orders";
import { createServerSupabase } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function Admin() {
    const supabase = await createServerSupabase();
    const { data: { user }} = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase.from('users').select('*').eq('id', user.id).maybeSingle();

    if (error || !data) {
        console.error(error);
        return [];
    }

    // if the current user is not admin and trying to reach this dashboard reroute to homepage
    if (!data.is_admin) {
        redirect("/");
    }
    
    return (
        <div>
            <h1>A WITCH'S WHISK ADMIN DASHBOARD</h1>
            <h1>VIEW ALL PRODUCTS</h1>
            <Link href="/admin/products">View ALL PRODUCTS</Link>
            <Link href="/admin/orders">VIEW ALL ORDERS</Link>
            <h1>VIEW ALL ORDERS</h1>
        </div>
    )
}