'use client';
import { useCart } from "@/app/context/cartContext";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";


type Props = { 
    product: Product;
};


export default function AddCartBtn( { product } : Props) {
    const [clicked, setClicked] = useState(false);
    const {addToCart, cartItems} = useCart()
    const inCart = cartItems.find(item => item.product_id === product.id);
    const router = useRouter();

    async function handleClick(e: React.MouseEvent) {
        e.stopPropagation()
        // if user doesnt exist, redirect to login page
        
        const { data: { user }} = await supabase.auth.getUser();

        if (!user) {
            router.push("/signUp");
            return;
        }
        
        setClicked(true);
        addToCart(product.id)
    
    }

    return (
        <button onClick={handleClick} disabled={clicked} className= {inCart ? "opacity-50 cursor-not-allowed": ""}>
            {inCart ? "Added" : "Add to Cart"}
        </button>
    )

}