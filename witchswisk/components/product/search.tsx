'use client';

import { useState } from "react";
import type { Product } from "@/lib/types";
import Card from "./card";
import CardModal from "./cardModal";
import ProductGrid from "./productGrid";


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
            <input className="w-4/5 bg-purple-400 rounded-md ml-5 h-8 text-black border border-black" type="search" placeholder="Search Cookie..." value={searchQuery} onChange={ (e) => setSearchQuery(e.target.value)}></input>
            <ProductGrid products={filteredProducts} />
        </div>

    )

}