'use client';
import type { Product } from "@/lib/types";
import Image from "next/image";
import OutOfOrderBtn from "./outOfOrderBtn";


type Props = {
    product: Product;
}

export default function AdminCard( { product} : Props) {
    return (
        <div 
            className="bg-brand w-full h-full flex flex-col items-center p-4 rounded-xl transition-transform relative">

            <Image 
                src={product.image} 
                alt={product.name} 
                width = {200}
                height = {200}
                className=" mt-2 rounded-xl border border-white object-cover"
            />
            <h1 className="text-2xl font-bold font-dancing text-center mt-2">{product.name}</h1>
            <h1 className="text-lg font-semibold">${product.price}.00</h1>
            <h1 className="text-sm text-center line-clamp-2 px-2">{product.description}</h1>

            <div className="mt-auto pt-3">
                <OutOfOrderBtn product={product}/>
            </div>
        </div>
    )
}