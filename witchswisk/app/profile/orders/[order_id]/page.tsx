import { createServerSupabase } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import StatusBar from "@/components/statusBar";

export default async function OrderDetails({
    params,
}: {
    params: Promise<{ order_id: string }>;
}) {
    const { order_id } = await params;
    const supabase = await createServerSupabase();

    const order = await supabase.from('orders').select('*').eq('id', order_id).single();
    if (order.error || !order.data) return notFound();
    const orderDetails = order.data;

    const orderReceipt = await supabase
        .from('order_items')
        .select('*, products(image)')
        .eq('order_id', order_id);
    if (orderReceipt.error || !orderReceipt.data) return notFound();
    const orderItems = orderReceipt.data;

    const formattedDate = new Date(orderDetails.created_at).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8">

            <Link
                href="/profile"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:underline"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Orders
            </Link>

            <div className="bg-brand rounded-xl p-4 md:p-6 mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <h1 className="text-2xl font-bold">Order #{order_id}</h1>
                    <span className="text-sm text-muted-foreground">{formattedDate}</span>
                </div>

                <StatusBar status={orderDetails.status} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm mt-2">
                    <div>
                        <span className="text-muted-foreground">Name:</span>{" "}
                        <span className="font-medium">{orderDetails.name}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Shipping Address:</span>{" "}
                        <span className="font-medium">{orderDetails.address}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Total:</span>{" "}
                        <span className="font-medium">${orderDetails.total_price}.00</span>
                    </div>
                </div>
            </div>

            <div className="bg-brand rounded-xl p-4 md:p-6">
                <h2 className="text-lg font-bold mb-4">Items</h2>

                <div className="flex flex-col divide-y divide-muted">
                    {orderItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-input">
                                {item.products?.image ? (
                                    <Image
                                        src={item.products.image}
                                        alt={item.product_name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : null}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{item.product_name}</h3>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>

                            <div className="text-right shrink-0">
                                <p className="font-medium">${item.checkout_price}.00</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}