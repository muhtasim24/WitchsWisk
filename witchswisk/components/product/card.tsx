'use client';
import type { Product } from "@/lib/types";
import Image from "next/image";
import AddCartBtn from "../cart/addCartBtn";


type Props = {
    product: Product;
    onClick: () => void;
}

export default function Card( { product, onClick } : Props) {
    return (
        <div onClick = {onClick} className="bg-brand w-80 h-80 flex flex-col items-center m-8 rounded-xl cursor-pointer hover:">
            <Image 
                src={product.image} 
                alt={product.image} 
                width = {150}
                height = {150}
            />
            <h1 className="text-xl font-bold">{product.name}</h1>
            <h1 className="text-lg font-semibold">${product.price}.00</h1>
            <h1>{product.description}</h1>
            <br></br>
            <AddCartBtn product={product}/>
        </div>
    )
}