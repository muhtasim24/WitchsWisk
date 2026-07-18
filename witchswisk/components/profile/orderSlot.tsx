import { Order } from "@/lib/types";

type OrderSlotProps = {
    order: Order
}


export default function OrderSlot( { order } : OrderSlotProps ) {
    return (
        <div className="bg-brand flex flex-col items-center m-8 rounded-xl">
            <h1>ORDER #:{order.id}</h1>
            <h1>Date Ordered: {order.created_at}</h1>
            <h1>Total Price: ${order.total_price}.00</h1>
            <h1>Status: {order.status.toUpperCase()}</h1>
        </div>
    )
}