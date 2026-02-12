'use client';
import { useState } from "react";
import { Product } from "@/data/products";
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
        <div className="flex gap-3 grid grid-cols-3 ">
        {products.length === 0 ? (
            <p>No cookies found</p>
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