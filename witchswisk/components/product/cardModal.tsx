'use client';
import type { Product } from "@/lib/types";
import Image from "next/image";
import AddCartBtn from "../cart/addCartBtn";
import {X} from "lucide-react";


type Props = {
    product: Product;
    onClose: () => void;
}

export default function CardModal( {product, onClose} : Props) {

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={onClose}>
            <div className="relative bg-brand w-130 h-80 rounded-xl p-6" onClick={ (e) => e.stopPropagation()}>
                <button onClick = {onClose} className="absolute top-4 right-4"><X/></button>

                <div className="flex gap-8 items-center justify-center pt-8">
                    <div className="flex-shrink-0">
                        <Image 
                            src={product.image} 
                            alt={product.image} 
                            width = {100}
                            height = {100}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">{product.name} </h1>
                        <h1 className="text-lg font-semibold"> ${product.price}.00 </h1>
                        <h1>Description: {product.description}</h1>
                        <h1> Ingredients: {product.ingredients} </h1>
                        <AddCartBtn product={product}/>
                    </div>
                </div>
            
            </div>
        </div>
    )
}