'use client';

import { useState } from "react";
import type { Product, ProductWithImages } from "@/lib/types";
import Card from "./card";
import CardModal from "./cardModal";
import ProductGrid from "./productGrid";
import { SearchIcon } from "lucide-react";

type Props = {
    products: Product[];
}

export default function Search({ products } : Props) {
    const [searchQuery, setSearchQuery] = useState("");
    
    const filteredProducts = products.filter( (product) => (
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    
    return (
        <div>
            <div className="flex items-center justify-center">
                <input className="flex items-center w-5/5 bg-purple-400 rounded-md h-10 text-black border border-black px-2" type="search" placeholder="Search Cookie..." value={searchQuery} onChange={ (e) => setSearchQuery(e.target.value)}></input>
            </div>
            <ProductGrid products={filteredProducts} />
        </div>

    )

}