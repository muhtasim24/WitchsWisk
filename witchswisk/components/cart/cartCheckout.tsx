'use client'
import { useCart } from "@/app/context/cartContext";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";


type Props = {
    products: Product[];
}

const SHIPPING_PRICE = 15; // Flat Shipping Fee $15
const TAX_RATE = 0.08875; // NY Sales Tax

export default function CartCheckout( {products} : Props) {

    const { cartItems, loadCart } = useCart();
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [errors, setErrors] = useState( {
        fullName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        cartSize: ""
    })

    // I want to display name, quantity and price here and total price

    // do calculations outside of rendering
    // start a running total, starts at 0
    // for each matching product to the cartItem, find the price and add to the total
    const subTotal : number = cartItems.reduce( (sum, item) => {
        const product = products.find(p => p.id === item.product_id);
        if (!product) return sum;

        return sum + item.quantity * product.price;
    }, 0);

    const shippingPrice = cartItems.length > 0 ? SHIPPING_PRICE : 0;
    const salesTax = subTotal * TAX_RATE;
    const totalPrice = subTotal + shippingPrice + salesTax;

    

    // async function handleCheckout() {

    //     console.log("CHECKING OUT ORDER");
    //     const { data: { user }} = await supabase.auth.getUser(); 
    //     console.log("CART CHECKOUT USER", user);
    //     if (!user) return;
    //     console.log(user.id);
    //     const userId = user.id;
    //     const address = streetAddress + " " + city + " " + state + " " + zipCode;
    //     const userEmail = user.email;

    //     console.log("ADDRESS", address)
    //     console.log("FULL NAME IN ORDEr", fullName);

    //     try {
    //         const res = await fetch("/api/webhook", {
    //             method: "POST",
    //             headers: {"Content-Type": "application/json"},
    //             body: JSON.stringify( {userId, address, fullName, userEmail})
    //         })
    //         if (!res.ok) {
    //             throw new Error("Failed to checkout");
    //         }

    //     }
    //     catch(error) {
    //         console.log("CHECKOUT FAILED", error)
    //     }
    //     finally {
    //         // refrehs the UI , so cart is deleted once order is completed/made
    //         console.log("CHECKED OUT LOADING CART AGAIN");
    //         await loadCart();
    //     }
    // }


    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white mb-4 font-dancing uppercase">Order Summary</h2>
            
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2">
                {cartItems.map(item => {
                    const product = products.find(product => product.id === item.product_id);

                    if (!product) return null;
                
                    return (
                        <div key = {item.product_id} className="flex justify-between items-center gap-2 text-sm text-white border-b border-white/20 pb-2">
                            <span className="truncate flex-1"> {product.name} </span>
                            <span className="shrink-0"> {item.quantity}x </span>
                            <span className="font-semibold shrink-0"> ${item.quantity * product.price}.00</span>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/30 flex flex-col gap-1 text-sm text-white/90">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Sales Tax (8.875%)</span>
                    <span>${salesTax.toFixed(2)}</span>
                </div>
            </div>
            

            <div className="mt-3 pt-3 border-t border-white">
                <h1 className="text-xl font-semibold text-white mb-3">Total Price: ${totalPrice.toFixed(2)}</h1>
                <form action="/api/checkout_session" method="POST">
                    <button type="submit" role="link" 
                    className="w-full px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand">
                        GO TO CHECKOUT
                    </button>

                </form>
                {/* <button onClick={handleCheckout} className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand items-center">PLACE ORDER</button> */}
                {errors.cartSize && (
                    <p className="text-red-500 text-sm flex text-center mt-2">{errors.cartSize}</p>
                )} 
            </div>
        </div>
    )
}