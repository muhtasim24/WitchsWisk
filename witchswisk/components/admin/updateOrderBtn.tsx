'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

type Props = {
    orderId: string,
    status: string
}

export default function UpdateOrderBtn({ orderId, status }: Props) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const nextStatus = status === "Mark as Shipped" ? "Shipped" : "Delivered";

    async function handleConfirm() {
        setShowConfirm(false);
        setIsUpdating(true);
        try {
            const res = await fetch("/api/orders", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: orderId, newStatus: nextStatus })
            });

            if (!res.ok) throw new Error(`Failed to set order as ${nextStatus}`);
            router.refresh();
        } catch (err) {
            console.log(err);
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                disabled={isUpdating}
                className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand hover:text-bg-brand cursor-pointer hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isUpdating ? "Updating..." : status}
            </button>

            {showConfirm && (
                <div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowConfirm(false)}
                >
                    <div
                        className="bg-brand rounded-xl p-6 max-w-sm w-full flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold text-white text-center">
                            Mark this order as {nextStatus.toLowerCase()}?
                        </h2>
                        <p className="text-white/70 text-sm text-center">
                            This will update the order status to "{nextStatus}". This can't be undone from here.
                        </p>
                        <div className="flex gap-3 justify-center mt-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-5 py-2 rounded-lg font-semibold bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-5 py-2 rounded-lg font-semibold bg-white text-brand hover:scale-105 transition-all cursor-pointer"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}