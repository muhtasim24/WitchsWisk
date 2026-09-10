'use client'
import type { Product } from "@/lib/types";

import { CartItem, useCart } from "@/app/context/cartContext"
import Image from "next/image";
import { Plus, Minus, X} from "lucide-react";

type Props = {
    item: CartItem;
    product: Product;
}

export default function CartSlot( {item, product}: Props) {
    const {cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart, isLoading} = useCart();
    console.log(isLoading);
    return (
        <div className="bg-purple-500 rounded-xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center relative">
            <button 
                className = "absolute top-3 right-3 text-white/70 hover:text-white disabled:opactiy-50 disabled:cursor-not-allowed" 
                disabled = {isLoading}
                onClick={() => removeFromCart(item.product_id)}
            >
                <X size={24}/>
            </button>
            
            <Image
                src={product.image} 
                alt={product.name} 
                width = {100}
                height = {100}
                className="w-20 h-20 rounded-lg object-cover mx-auto sm:w-24 sm:h-24 sm:mx-0 sm:shrink-0"
            />
            <div className="flex-1 min-w-0">
                <h1 className = "text-xl font-bold text-white font-dancing truncate pr-6">{product.name}</h1>
                <p className="text-white/80 text-sm line-clamp-2">{product.description}</p>
                <div className = "flex items-center gap-4 mt-3">
                    <button 
                        className="text-white disabled:opacity-50 disabled:cursor-not-allowed" 
                        disabled = {isLoading} 
                        onClick={() => decreaseCartQuantity(item.product_id)}>
                        <Minus size={24}/>
                    </button>
                    <span className = "font-bold text-white">{item.quantity}x</span>
                    <button 
                        className="text-white disabled:opacity-50 disabled:cursor-not-allowed" 
                        disabled = {isLoading} 
                        onClick={() => increaseCartQuantity(item.product_id)}>
                        <Plus size={24}/>
                    </button>
                </div>

                <div className="text-center sm:text-right shrink-0">
                    <p className="font-bold text-lg text-white">Price: ${product.price}.00</p>
                </div>
            </div>
        </div>
    )
}