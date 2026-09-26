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

    async function handleClick(e: React.MouseEvent) {
        e.stopPropagation()
        setInStock(!inStock);
        
    
    }

    return (
        <button onClick={handleClick} className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand hover:text-bg-brand cursor-pointer hover:scale-105">
            {inStock ? "Set Unavailable" : "Set Available"}
        </button>
    )

}