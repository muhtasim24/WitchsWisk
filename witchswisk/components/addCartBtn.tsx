'use client';
import { useState } from "react";


export default function AddCartBtn() {
    const [clicked, setClicked] = useState(false);

    function handleClick() {
        setClicked(true);
    }

    return (
        <div>
            {clicked === true ? (
                <button>Added</button>
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