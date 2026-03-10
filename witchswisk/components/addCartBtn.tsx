'use client';
import { useCart } from "@/app/context/cartContext";
import { Product } from "@/data/products";
import { useState } from "react";


type Props = { 
    product: Product;
};


export default function AddCartBtn( { product } : Props) {
    const [clicked, setClicked] = useState(false);
    const {addToCart} = useCart()

    function handleClick() {
        setClicked(true);
    }

    return (
        <div>
            {clicked === true ? (
                <button onClick={ (e) => {e.stopPropagation}}>Added</button>
            ) : (
                <button 
                onClick={(e) => {e.stopPropagation();
                    handleClick();
                    
                }}
                    >Add to Cart</button>
            )}
        </div>
    )
}