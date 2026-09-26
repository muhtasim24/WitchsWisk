import { Order } from "@/lib/types";
import { Check } from "lucide-react";
import StatusBar from "../statusBar";

type OrderSlotProps = {
    order: Order
}

export default function OrderSlot({ order }: OrderSlotProps) {
    const formattedDate = new Date(order.created_at).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    return (
        <div className="flex flex-col gap-3 rounded-xl bg-input p-4 hover:brightness-95 transition hover:scale-101">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <h2 className="text-lg font-bold">#{order.id}</h2>
                <span className="text-sm text-muted-foreground">{formattedDate}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                <div className="flex flex-col">
                    <span>Name: {order.name}</span>
                    <span>Shipping to: {order.address}</span>
                </div>
                <span className="font-medium">Total: ${order.total_price}.00</span>
            </div>

            <StatusBar status={order.status} />
        </div>
    );
}