'use client';
import { useState } from "react";
import type { Product } from "@/lib/types";
import { SearchX } from "lucide-react";
import AdminCard from "./adminCard";


type Props = {
    products: Product[];
}

export default function AdminProductGrid( {products} : Props) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-white/70">
                <SearchX size={48} />
                <p className="text-xl font-semibold">No cookies found</p>
                <p className="text-sm">Try a different search term</p>
            </div>
        );
    }
        return (
            <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {products.map(product => (
                    <AdminCard 
                        key={product.id} 
                        product={product} 
                        // onClick={ () => handleCardClick(product)}
                    />
                ))}
            </div>
        )
}