'use client';

import { useState } from "react";
import type { Product } from "@/lib/types";
import { SearchIcon } from "lucide-react";
import AdminProductGrid from "./adminProductGrid";

type Props = {
    products: Product[];
}

export default function AdminSearch({ products } : Props) {
    const [searchQuery, setSearchQuery] = useState("");
    
    const filteredProducts = products.filter( (product) => (
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center">
                <input className="flex items-center w-5/5 bg-input text-white rounded-md h-10  border border-white px-2" type="search" placeholder="Search Cookie..." value={searchQuery} onChange={ (e) => setSearchQuery(e.target.value)}></input>
            </div>
            <AdminProductGrid products={filteredProducts} />
        </div>

    )

}