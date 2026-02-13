'use client';
import { Product } from "@/data/products";
import Image from "next/image";


type Props = {
    product: Product;
    onClose: () => void;
}

export default function CardModal( {product, onClose} : Props) {

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={onClose}>

        <div className="bg-brand w-80 rounded-xl flex flex-col items-center justify-center" onClick={ (e) => e.stopPropagation()}>
            <button onClick = {onClose} className="flex justify-start">X</button>
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
        </div>
    )
}