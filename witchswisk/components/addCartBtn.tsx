'use client';
import { useCart } from "@/app/context/cartContext";
import type { Product } from "@/lib/types";
import { useState } from "react";


type Props = { 
    product: Product;
};


export default function AddCartBtn( { product } : Props) {
    const [clicked, setClicked] = useState(false);
    const {addToCart, cartItems} = useCart()

    const inCart = cartItems.find(item => item.id === product.id);
    console.log("CART ITEMS: ", cartItems)
    function handleClick(e: React.MouseEvent) {
        e.stopPropagation()
        addToCart(product.id)
    
    }

    return (
        <button onClick={handleClick}>
            {inCart ? "Added" : "Add to Cart"}
        </button>
    )

}