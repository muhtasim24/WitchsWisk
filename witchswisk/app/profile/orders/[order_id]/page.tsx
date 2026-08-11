import { createServerSupabase } from "@/lib/supabase/server";


export default async function OrderDetails({
    params,
}: {
    params: Promise <{ order_id: string} >;
}) {
    const { order_id } = await params;
    console.log(order_id);
    const supabase = await createServerSupabase();
    
    const order = await supabase.from('orders').select('*').eq('id', order_id);
    if (!order.data) return;
    const orderDetails = order.data[0];
    console.log("FULL ORDER", order);
    console.log(orderDetails.name)
    const orderReciept = await supabase.from('order_items').select('*').eq('order_id', order_id);
    if (!orderReciept.data) return;
    console.log("THIS ORDER DETAILS", orderReciept);
    const orderItems = orderReciept.data;
    console.log(orderReciept);
    return (
        <div>
            <h1>ORDER #{order_id}</h1>
            <div>
                <h1>Shipping Info</h1>
                <h1>{orderDetails.name}</h1>
                <h1>{orderDetails.address}</h1>
                <h1>${orderDetails.total_price}.00</h1>
                <h1>{orderDetails.status}</h1>
            </div>
            <div className = "bg-brand rounded-lg p-2">
                {orderItems.map(item => (
                <div key = {item.id} className="flex gap-4">
                    <h1>Name: {item.product_name}</h1>
                    <h1>Price: ${item.checkout_price}.00</h1>
                    <h1>Quantity: {item.quantity}x</h1>
                </div>
            ))}
            </div>
        </div>
    )
}