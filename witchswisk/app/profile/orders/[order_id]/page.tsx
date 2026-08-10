import { createServerSupabase } from "@/lib/supabase/server";


export default async function OrderDetails({
    params,
}: {
    params: Promise <{ order_id: string} >;
}) {
    const { order_id } = await params;
    console.log(order_id);
    const supabase = await createServerSupabase();
    const orderDetails = await supabase.from('order_items').select('*').eq('order_id', order_id);
    console.log("THIS ORDER DETAILS", orderDetails);
    const orderReciept = orderDetails.data;
    console.log(orderReciept);
    return (
        <div>
            <h1>ORDER #{order_id}</h1>
            
        </div>
    )
}