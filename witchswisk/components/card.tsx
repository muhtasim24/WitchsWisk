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
                width = {150}
                height = {150}
            />
            <h1>{product.name}</h1>
            <h1>${product.price}.00</h1>
            <br></br>
            <button>Add to Cart</button>
        </div>
    )
}