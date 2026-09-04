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
    const totalPrice : number = cartItems.reduce( (sum, item) => {
        const product = products.find(p => p.id === item.product_id);
        if (!product) return sum;

        return sum + item.quantity * product.price;
    }, 0);

    

    async function handleCheckout() {

        console.log("CHECKING OUT ORDER");
        const { data: { user }} = await supabase.auth.getUser(); 
        console.log("CART CHECKOUT USER", user);
        if (!user) return;
        console.log(user.id);
        const userId = user.id;
        const address = streetAddress + " " + city + " " + state + " " + zipCode;
        const userEmail = user.email;

        console.log("ADDRESS", address)
        console.log("FULL NAME IN ORDEr", fullName);

        try {
            const res = await fetch("/api/webhook", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {userId, address, fullName, userEmail})
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
        <div className="flex flex-col gap-4">
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

            <h1 className="text-xl font-semibold">Total Price: ${totalPrice}.00</h1>
            <form action="/api/checkout_session" method="POST">
                <button type="submit" role="link" className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand items-center">PLACE ORDER</button>

            </form>
            {/* <button onClick={handleCheckout} className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand items-center">PLACE ORDER</button> */}
            {errors.cartSize && (
                <p className="text-red-500 text-xl flex justify-center items-center">{errors.cartSize}</p>
            )} 
        </div>
    )
}