import OrderSlot from "@/components/profile/orderSlot";
import { getOrder } from "@/lib/orders"
import { createServerSupabase } from "@/lib/supabase/server";
import { User } from "lucide-react";
import Link from "next/link";

export default async function Profile() {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const orders = await getOrder();

    const userInfo = await supabase.from('users').select('*').eq('id', user.id);
    if (!userInfo.data || userInfo.error) {
        return <div className="p-8 text-red-500">Failed to load profile.</div>;
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 md:p-8 max-w-6xl mx-auto">

            {/* Left side - User Info */}
            <div className="w-full md:w-64 shrink-0 bg-brand rounded-xl p-6 flex flex-col items-center gap-2 h-fit border border-white">
                <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center">
                    <User className="w-8 h-8" />
                </div>
                <h1 className="text-lg font-bold text-center ">
                    {userInfo.data[0].name}
                </h1>
                <p className="text-sm text-muted-foreground text-center break-all">
                    {user.email}
                </p>
            </div>

            {/* Right side - Orders */}
            <div className="flex-1 bg-brand p-4 rounded-xl flex flex-col min-h-0">
                <h1 className="text-2xl font-bold font-dancing mb-4 shrink-0">ORDER HISTORY</h1>

                <div className="flex flex-col gap-3 overflow-y-auto pr-1 max-h-[70vh]">
                    {orders.map(orderItem => (
                        <Link key={orderItem.id} href={`/profile/orders/${orderItem.id}`}>
                            <OrderSlot order={orderItem} />
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}