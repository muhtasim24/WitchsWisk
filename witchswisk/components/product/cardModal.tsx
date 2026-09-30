'use client';
import type { Product } from "@/lib/types";
import Image from "next/image";
import AddCartBtn from "../cart/addCartBtn";
import { X } from "lucide-react";


type Props = {
    product: Product;
    onClose: () => void;
}

export default function CardModal({ product, onClose }: Props) {

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="relative bg-brand w-full max-w-md sm:max-w-2xl max-h-[75vh] sm:max-h-[85vh] overflow-y-auto rounded-xl p-5 sm:p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 hover:scale-105 cursor-pointer">
                    <X size={20} />
                </button>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start pt-6 sm:pt-8">
                    <div className="flex-shrink-0 w-2/3 sm:w-1/3 flex justify-center">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="rounded-xl object-cover w-full max-w-[140px] sm:max-w-[200px] h-auto"
                        />
                    </div>

                    <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-2/3 items-center sm:items-start">
                        <h1 className="text-lg sm:text-3xl font-bold font-dancing text-center sm:text-left">{product.name}</h1>
                        <h2 className="text-base sm:text-xl font-semibold text-white/90 text-center sm:text-left">${product.price}.00</h2>

                        <div className="mt-1 sm:mt-2 w-full">
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/60">Description</h3>
                            <p className="text-sm">{product.description}</p>
                        </div>

                        <div className="w-full">
                            <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-white/60">Ingredients</h3>
                            <p className="text-xs">{product.ingredients}</p>
                        </div>

                        <AddCartBtn product={product} />
                    </div>
                </div>

            </div>
        </div>
    )
}