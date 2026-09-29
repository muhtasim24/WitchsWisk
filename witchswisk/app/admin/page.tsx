import { getProducts } from "@/lib/getProducts";
import { getOrder } from "@/lib/orders";
import { createServerSupabase } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Package, ClipboardList } from "lucide-react";


export default async function Admin() {
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

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <h1 className="text-2xl sm:text-3xl font-bold font-dancing text-white text-center mb-8">
                A Witch's Whisk — Admin Dashboard
            </h1>

            <div className="grid sm:grid-cols-2 gap-6">
                <Link
                    href="/admin/products"
                    className="bg-brand rounded-xl p-6 flex flex-col items-center gap-3 text-center hover:scale-105 transition-transform cursor-pointer"
                >
                    <Package size={40} className="text-white" />
                    <h2 className="text-xl font-bold text-white">Products</h2>
                    <p className="text-white/70 text-sm">
                        View all products and manage stock availability
                    </p>
                </Link>

                <Link
                    href="/admin/orders"
                    className="bg-brand rounded-xl p-6 flex flex-col items-center gap-3 text-center hover:scale-105 transition-transform cursor-pointer"
                >
                    <ClipboardList size={40} className="text-white" />
                    <h2 className="text-xl font-bold text-white">Orders</h2>
                    <p className="text-white/70 text-sm">
                        View orders and update shipping & delivery status
                    </p>
                </Link>
            </div>
        </div>
    );
}