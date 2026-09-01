import OrderSlot from "@/components/profile/orderSlot";
import { getOrder, getOrderReciept } from "@/lib/orders"
import { createServerSupabase } from "@/lib/supabase/server";
import { User } from "lucide-react";
import Link from "next/link";


export default async function Profile() {
    // should have user name, email, address,
    const supabase = await createServerSupabase();
    const { data: { user }} = await supabase.auth.getUser();
    if (!user) return [];
    const orders = await getOrder();
    
    const userInfo = await supabase.from('users').select('*').eq('id', user.id);
    console.log("USER INFO", userInfo);
    if (!userInfo.data || userInfo.error) {
        return userInfo.error;
    }


    return (
        <div className="flex gap-2 p-8">
    
            {/* Left side - User Info */}
            <div className="w-1/3 bg-brand flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold">
                    Welcome {userInfo.data[0].name}
                </h1>
                <h1>{user.email}</h1>
    
                <h1>Address HERE</h1>
            </div>
    
    
            {/* Right side - Orders */}
            <div className="w-2/3 bg-brand p-4 rounded-xl">
    
                <h1 className="text-2xl font-bold">
                    ORDER HISTORY
                </h1>
    
                {orders.map(orderItem => (
                    <Link key = {orderItem.id} href={`/profile/orders/${orderItem.id}`}>
                        <div 
                            key={orderItem.id} 
                            className="rounded-lg p-2 mb-2"
                        >
                            <OrderSlot order={orderItem} />
                        </div>
                    </Link>
                ))}
    
            </div>
    
        </div>
    )
}