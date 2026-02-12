'use client';
import { Product } from "@/data/products";
import Image from "next/image";


type Props = {
    product: Product;
    onClose: () => void;
}

export default function CardModal( {product, onClose} : Props) {

    return (
        <div className="bg-brand w-80 rounded-xl">
            <button onClick = {onClose}>X</button>
            <Image 
                src={product.image} 
                alt={product.image} 
                width = {100}
                height = {100}
            />
            <h1> {product.name} </h1>
            <h1> ${product.price}.00 </h1>
            <h1> Ingredients: {product.ingredients} </h1>
            <button>Add to Cart </button>
        </div>
    )
}