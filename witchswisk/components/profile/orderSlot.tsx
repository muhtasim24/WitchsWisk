import { Order } from "@/lib/types";




export default function OrderSlot( { order } : Order ) {
    return (
        <div>
            <h1>{order.id}</h1>
        </div>
    )
}