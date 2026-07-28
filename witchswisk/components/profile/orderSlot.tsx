import { Order } from "@/lib/types";

type OrderSlotProps = {
    order: Order
}


export default function OrderSlot( { order } : OrderSlotProps ) {
    const formattedDate = new Date(order.created_at).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        });
    return (
        <div className="flex flex-col items-center rounded-xl bg-purple-500">
            <div className="w-full">
                <h1 className="text-xl font-bold p-2">#:{order.id}</h1>
            </div>
            <h1>Date Ordered: {formattedDate}</h1>
            <h1>Total Price: ${order.total_price}.00</h1>
            <h1>Status: {order.status.toUpperCase()}</h1>
        </div>
    )
}