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
            <div className="relative bg-brand w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl p-6" onClick={ (e) => e.stopPropagation()}>
                <button onClick = {onClose} className="absolute top-4 right-4"><X/></button>

                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start pt-8">
                    <div className="flex-shrink-0 w-full sm:w-1/3 flex justify-center">
                        <Image 
                            src={product.image} 
                            alt={product.name} 
                            width = {200}
                            height = {200}
                            className="rounded-xl object-cover w-full max-w-[200px] h-auto"
                        />
                    </div>

                    <div className="flex flex-col gap-3 w-full sm:w-2/3">
                        <h1 className="text-2xl sm:text-3xl font-bold font-dancing">{product.name}</h1>
                        <h2 className="text-xl font-semibold text-white/90">${product.price}.00</h2>
                        <div className="mt-2">
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/60">Description</h3>
                            <p className="text-sm">{product.description}</p>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/60">Ingredients</h3>
                            <p className="text-sm">{product.ingredients}</p>
                        </div>

                        <AddCartBtn product={product}/>
                    </div>
                </div>
            
            </div>
        </div>
    )
}