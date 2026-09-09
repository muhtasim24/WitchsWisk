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
        <div onClick = {onClick} className="bg-brand w-full h-full flex flex-col items-center p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform">
            <Image 
                src={product.image} 
                alt={product.name} 
                width = {200}
                height = {200}
                className=" mt-2 rounded-xl border border-black object-cover"
            />
            <h1 className="text-2xl font-bold font-dancing text-center mt-2">{product.name}</h1>
            <h1 className="text-lg font-semibold">${product.price}.00</h1>
            <h1 className="text-sm text-center line-clamp-3 px-2">{product.description}</h1>
            <div className="mt-auto pt-3">
                <AddCartBtn product={product}/>
            </div>
        </div>
    )
}