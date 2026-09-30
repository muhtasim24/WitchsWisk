import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OrderSlot from "@/components/profile/orderSlot";

export default async function AdminOrders() {
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

    const { data: allOrders, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (!allOrders) {
        return;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
            >
                <ArrowLeft size={20} />
                Back to Dashboard
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold font-dancing text-white mb-1">
                All Orders
            </h1>
            <p className="text-white/70 mb-6">
                {allOrders.length} order{allOrders.length !== 1 ? "s" : ""} total
            </p>

            <div className="bg-brand p-5 sm:p-6 rounded-xl">
                <div className="flex flex-col gap-3 overflow-y-auto pr-1 max-h-[70vh]">
                    {allOrders.length === 0 ? (
                        <p className="text-white/60 text-center py-8">No orders yet.</p>
                    ) : (
                        allOrders.map(orderItem => (
                            <Link
                                key={orderItem.id}
                                href={`/admin/orders/${orderItem.id}`}
                                className="block rounded-lg transition-transform hover:scale-[1.02]"
                            >
                                <OrderSlot order={orderItem} />
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}