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
    const inCart = cartItems.find(item => item.product_id === product.id);

    function handleClick(e: React.MouseEvent) {
        e.stopPropagation()
        setClicked(true);
        addToCart(product.id)
    
    }

    return (
        <button onClick={handleClick} disabled={clicked} className= {inCart ? "opacity-50 cursor-not-allowed": ""}>
            {inCart ? "Added" : "Add to Cart"}
        </button>
    )

}