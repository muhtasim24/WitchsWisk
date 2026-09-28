'use client'
import { useCart } from "@/app/context/cartContext";
import type { Product } from "@/lib/types";
import CartSlot from "./cartSlot";
import { useEffect } from "react";
import Link from "next/link"

type Props = {
    products: Product[];
}

export default function CartView( { products } : Props) {

    const { cartItems } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <p className="text-white text-2xl text-center py-8 font-dancing">Empty Cart</p>
                <Link href={"/cookies"} className="text-lg px-2 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand">SHOP COOKIES</Link>
            </div>
        )
    }

    return (
        // go through cart Items and products
        // everyTime cartItem id matches with a product's id, call Card Item component to display that item in the cart
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto lg:pr-2">
            {cartItems.map(cartItem => {
                console.log("ITME", cartItem.product_id);
                const product = products.find(product => product.id === cartItem.product_id);
                console.log(product);
                if (!product) return null

                return (<CartSlot 
                            key = {cartItem.product_id}
                            item = {cartItem} 
                            product={product} 
                        />
                )
            })}
        </div>
    )
}