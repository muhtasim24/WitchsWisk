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
        <div className="bg-purple-600 w-250 h-40 flex items-center m-8 rounded-xl">
            <Image
                src={product.image} 
                alt={product.image} 
                width = {100}
                height = {100}
            />
            <div>
                <h1 className = "text-lg font-bold text-white">{product.name}</h1>
                <p className="text-white">{product.description}</p>
                <div className = "flex gap-10">
                    <button className="text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled = {isLoading} onClick={() => decreaseCartQuantity(item.product_id)}>
                        <Minus/>
                    </button>
                    <h1 className = "font-bold text-lg" >{item.quantity}x</h1>
                    <button className="text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled = {isLoading} onClick={() => increaseCartQuantity(item.product_id)}>
                        <Plus/>
                    </button>
                </div>
                <button className = "text-sm disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => removeFromCart(item.product_id)}>
                    <X/>
                </button>
                <h1 className="flex justify-end ml-200 font-bold text-lg ">Price: ${product.price}.00</h1>
            </div>
        </div>
    )
}