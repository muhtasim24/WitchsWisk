import AdminSearch from "@/components/admin/adminSearch";
import Search from "@/components/product/search";
import { getProducts } from "@/lib/getProducts";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default async function AdminProducts() {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect("/");

    const { data, error } = await supabase.from('users').select('*').eq('id', user.id).maybeSingle();

    if (error || !data) {
        console.error(error);
        redirect("/");
    }

    if (!data.is_admin) {
        redirect("/");
    }

    const products = await getProducts();

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
            >
                <ArrowLeft size={20} />
                Back to Dashboard
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold font-dancing text-white mb-2">
                Admin Products
            </h1>
            <p className="text-white/70 mb-6">
                Toggle stock availability for each product below.
            </p>

            <AdminSearch products={products} />
        </div>
    );
}