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
        <div 
            onClick={product.in_stock ? onClick : undefined} 
            className={`bg-brand w-full h-full flex flex-col items-center p-4 rounded-xl transition-transform relative ${
                product.in_stock 
                    ? "cursor-pointer hover:scale-105" 
                    : "cursor-not-allowed opacity-80"
            }`}
        >
            {!product.in_stock && (
                <div className="absolute top-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    OUT OF STOCK
                </div>
            )}
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
                {product.in_stock ? (
                    <AddCartBtn product={product}/>
                ) : (
                    <button disabled className="px-4 py-2 rounded-lg bg-gray-500 text-white/70 cursor-not-allowed font-semibold">
                        Out of Stock
                    </button>
                )}
            </div>
        </div>
    )
}