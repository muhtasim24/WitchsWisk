'use client';

import { useState } from "react";
import { Product } from "@/data/products";
import Card from "./card";
import CardModal from "./cardModal";


type Props = {
    products: Product[];
}

export default function SearchProduct({ products } : Props) {
    const [searchQuery, setSearchQuery] = useState("");
    
    const filteredProducts = products.filter( (product) => (
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    
    return (
        <div>
            <input type="search" placeholder="Search Cookie..." value={searchQuery} onChange={ (e) => setSearchQuery(e.target.value)}></input>
            <div className="flex gap-3 grid grid-cols-3 ">
                {filteredProducts.length === 0 ? (
                    <p>No cookies found</p>
                ) : (
                filteredProducts.map(product => (
                    <Card 
                        key={product.id} 
                        product={product} 
                    />
                )))}
            </div>
        </div>

    )

}