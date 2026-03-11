'use client'
import { Product, products } from "@/data/products";

import { CartItem, useCart } from "@/app/context/cartContext"
import Image from "next/image";

type Props = {
    item: CartItem;
    product: Product;
}

export default function CartSlot( {item, product}: Props) {
    const {cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useCart();

    return (
        <div className="bg-brand w-250 h-40 flex  items-center m-8 rounded-xl">
            <Image
                src={product.image} 
                alt={product.image} 
                width = {100}
                height = {100}
            />
            <div>
                <h1 className = "text-lg font-bold">{product.name}</h1>
                <p>{product.description}</p>
                <div className = "flex gap-10">
                    <button className="text-sm" onClick={() => decreaseCartQuantity(item.id)}>Decrease</button>
                    <h1 className = "font-bold text-lg" >{item.quantity}x</h1>
                    <button className="text-sm" onClick={() => increaseCartQuantity(item.id)}>Add</button>
                </div>
                <button className = "text-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
                <h1 className="flex justify-end ml-200 font-bold text-lg ">Price: ${product.price}.00</h1>
            </div>
        </div>
    )
}