import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
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

    const {data: allOrders, error: orderError} = await supabase.from("orders").select("*").order("created_at", { ascending: false });

    if (!allOrders) {
        return;
    }


    console.log(data);
    return (
        <div>
            <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
            >
                <ArrowLeft size={20} />
                Back to Dashboard
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold font-dancing text-white mb-2">
                All Orders
            </h1>

            
            <div className="flex-1 bg-brand p-4 rounded-xl flex flex-col min-h-0">
                <h1 className="text-2xl font-bold font-dancing mb-4 shrink-0">ORDER HISTORY</h1>

                <div className="flex flex-col gap-3 overflow-y-auto pr-1 max-h-[70vh]">
                    
                {allOrders.map(orderItem => (
                    <Link key={orderItem.id} href={`/admin/orders/${orderItem.id}`}>
                        <OrderSlot order={orderItem} />
                    </Link>
                    ))
                }
                </div>
            </div>
        </div>
    )
}