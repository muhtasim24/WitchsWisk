'use client';
import { useState } from "react";
import type { Product } from "@/lib/types";
import Card from "./card";
import CardModal from "./cardModal";


type Props = {
    products: Product[];
}

export default function ProductGrid( {products} : Props) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    function handleCardClick(product: Product) {
        setSelectedProduct(product);
    };

    return (
        <div className="gap-3 grid grid-cols-3 justify-items-center">
            {products.length === 0 ? (
                <p className="text-2xl font-bold">No cookies found</p>
            ) : (
            products.map(product => (
                <Card 
                    key={product.id} 
                    product={product} 
                    onClick={ () => handleCardClick(product)}
                />
            )))}

            {selectedProduct && (
                <CardModal 
                    product={selectedProduct}
                    onClose={ () => setSelectedProduct(null)}
                />
            )}
    </div>
    )
}