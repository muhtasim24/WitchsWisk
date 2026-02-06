'use client';
import { Product } from "@/data/products";
import Image from "next/image";


type Props = {
    product: Product;
}

export default function Card( { product } : Props) {
    return (
        <div className="bg-purple-700 w-80 flex flex-col items-center m-8">
            <Image 
                src={product.image} 
                alt={product.image} 
                width = {300}
                height = {300}
            />
            <h1>{product.name}</h1>
            <h1>${product.price}.00</h1>
            <h1>Ingredients: {product.ingredients}</h1>
        </div>
    )
}