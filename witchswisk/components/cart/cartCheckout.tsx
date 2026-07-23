'use client'
import { useCart } from "@/app/context/cartContext";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";


type Props = {
    products: Product[];
}

export default function CartCheckout( {products} : Props) {

    const { cartItems, loadCart } = useCart();
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");

    // I want to display name, quantity and price here and total price

    // do calculations outside of rendering
    // start a running total, starts at 0
    // for each matching product to the cartItem, find the price and add to the total
    const totalPrice : number = cartItems.reduce( (sum, item) => {
        const product = products.find(p => p.id === item.product_id);
        if (!product) return sum;

        return sum + item.quantity * product.price;
    }, 0);


    async function handleCheckout() {
        console.log("CHECKING OUT ORDER");
        const { data: { user }} = await supabase.auth.getUser(); 
        if (!user) return;
        console.log(user.id);
        const userId = user.id;

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {userId})
            })
            if (!res.ok) {
                throw new Error("Failed to checkout");
            }

        }
        catch(error) {
            console.log("CHECKOUT FAILED", error)
        }
        finally {
            // refrehs the UI , so cart is deleted once order is completed/made
            console.log("CHECKED OUT LOADING CART AGAIN");
            await loadCart();
        }
    }


    return (
        <div className="flex flex-col">
            {cartItems.map(item => {
                const product = products.find(product => product.id === item.product_id);

                if (!product) return null;
              
                return (
                    <div key = {item.product_id} className="flex gap-30 text-lg">
                        <h1> {product.name} </h1>
                        <h1> {item.quantity}x </h1>
                        <h1> ${item.quantity * product.price}.00</h1>
                    </div>
                );
            })}

            <h1>Shipping Info</h1>
            <form>
                <label>Full Name</label>
                <input className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="text" value={fullName} onChange={ (e) => setFullName(e.target.value)}></input>
                
                <label>Address:</label>
                <input className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="text" value={streetAddress} onChange={ (e) => setStreetAddress(e.target.value)}></input>
            
                <label>City:</label>
                <input className="w-1/4 bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="text" value={streetAddress} onChange={ (e) => setStreetAddress(e.target.value)}></input>

                <label>Zip Code:</label>
                <input className="w-1/4 bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="text" value={zipCode} onChange={ (e) => setZipCode(e.target.value)}></input>
            </form>
            <h1 className="text-xl font-semibold">Total Price: ${totalPrice}.00</h1>
            <button onClick={handleCheckout} className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand items-center">PLACE ORDER</button>
        </div>
    )
}