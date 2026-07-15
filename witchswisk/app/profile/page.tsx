import OrderSlot from "@/components/profile/orderSlot";
import { getOrder, getOrderReciept } from "@/lib/orders"
import { createServerSupabase } from "@/lib/supabase/server";


export default async function Profile() {
    // should have user name, email, address,
    const supabase = await createServerSupabase();
    const { data: { user }} = await supabase.auth.getUser();
    if (!user) return [];
    console.log("USER", user);
    const orders = await getOrder();
    const orderRecipet = await getOrderReciept();
    
    console.log("ORDERS", orders);
    
    const userInfo = await supabase.from('users').select('*').eq('id', user.id);
    console.log("USER INFO", userInfo);
    if (!userInfo.data || userInfo.error) {
        return userInfo.error;
    }



    return (
        <div>
            <h1>user profile</h1>
            <h1>Orders</h1>
            <h1>{user.email}</h1>
            <h1>{userInfo.data[0].first_name}</h1>
            <h1>{userInfo.data[0].last_name}</h1>
            {orders.map(orderItem => {
                console.log(order)
                return (
                    <div>
                        <OrderSlot order = {orderItem} />
                    </div>
                )
            })}

        </div>
    )
}