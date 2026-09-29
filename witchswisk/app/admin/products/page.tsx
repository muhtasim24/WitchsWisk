import AdminSearch from "@/components/admin/adminSearch";
import Search from "@/components/product/search";
import { getProducts } from "@/lib/getProducts";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function AdminProducts() {
    const supabase = await createServerSupabase();
    const { data: { user }} = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase.from('users').select('*').eq('id', user.id).maybeSingle();

    if (error || !data ) {
        console.error(error);
        redirect("/");
    }

    // if the current user is not admin and trying to reach this dashboard reroute to homepage
    if (!data.is_admin) {
        redirect("/");
    }

    const products = await getProducts();
    return (
        <div>
            <h1>ADMIN PRODUCTS</h1>
            <h1>SET COOKIES OUT OF ORDER HERE</h1>
            <AdminSearch products={products}/>
        </div>
    )
}