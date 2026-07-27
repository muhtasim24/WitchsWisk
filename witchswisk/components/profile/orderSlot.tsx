import { Order } from "@/lib/types";

type OrderSlotProps = {
    order: Order
}


export default function OrderSlot( { order } : OrderSlotProps ) {
    return (
        <div className="flex flex-col items-center rounded-xl bg-purple-500">
            <div className="w-full">
                <h1 className="text-xl font-bold p-2">#:{order.id}</h1>
            </div>
            <h1>Date Ordered: {order.created_at}</h1>
            <h1>Total Price: ${order.total_price}.00</h1>
            <h1>Status: {order.status.toUpperCase()}</h1>
        </div>
    )
}