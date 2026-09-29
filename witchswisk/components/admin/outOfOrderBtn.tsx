'use client';
import { useCart } from "@/app/context/cartContext";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";


type Props = { 
    product: Product;
};


export default function OutOfOrderBtn( { product } : Props) {
    const [inStock, setInStock] = useState(product.in_stock);
    const [showConfirm, setShowConfirm] = useState(false);

    function handleClick(e: React.MouseEvent) {
        e.stopPropagation();
        setShowConfirm(true);
    }

    async function handleConfirm() {
        const newStock = !inStock;
        setInStock(newStock);
        setShowConfirm(false);
        // backend call to API
        try {
            const response = await fetch("/api/products", {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {id: product.id, in_stock: newStock})
            })
        } catch (error) {
            console.error(error);
            setInStock(inStock);
        }
    }

    function handleCancel() {
        setShowConfirm(false);
    }

    return (
        <>
            <button
                onClick={handleClick}
                className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand hover:text-bg-brand cursor-pointer hover:scale-105"
            >
                {inStock ? "Set Out of Stock" : "Set In Stock"}
            </button>

            {showConfirm && (
                <div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                    onClick={handleCancel}
                >
                    <div
                        className="bg-brand rounded-xl p-6 max-w-sm w-full flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold text-white text-center">
                            {inStock
                                ? `Mark "${product.name}" as out of stock?`
                                : `Mark "${product.name}" as in stock?`}
                        </h2>
                        <p className="text-white/70 text-sm text-center">
                            {inStock
                                ? "Customers won't be able to purchase this product until you set it back to available."
                                : "This product will become visible and purchasable to customers again."}
                        </p>
                        <div className="flex gap-3 justify-center mt-2">
                            <button
                                onClick={handleCancel}
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
    );
}