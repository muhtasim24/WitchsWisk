'use client'
import { useCart } from "@/app/context/cartContext";
import type { Product } from "@/lib/types";
import CartSlot from "./cartSlot";
import { useEffect } from "react";

type Props = {
    products: Product[];
}

export default function CartView( { products } : Props) {

    const { cartItems } = useCart();

    return (
        // go through cart Items and products
        // everyTime cartItem id matches with a product's id, call Card Item component to display that item in the cart
        <div>
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