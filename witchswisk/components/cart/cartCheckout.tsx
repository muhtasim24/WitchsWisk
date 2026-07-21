'use client'
import { useCart } from "@/app/context/cartContext";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { useRouter } from "next/navigation";


type Props = {
    products: Product[];
}

export default function CartCheckout( {products} : Props) {

    const { cartItems, loadCart } = useCart();
    const router = useRouter();

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
        <div>
            {cartItems.map(item => {
                const product = products.find(product => product.id === item.product_id);

                if (!product) return null;
              
                return (
                    <div key = {item.product_id} className="flex gap-15">
                        <h1> {product.name} </h1>
                        <h1> {item.quantity}x </h1>
                        <h1> ${item.quantity * product.price}.00</h1>
                    </div>
                );
            })}

            <h1>Total Price: ${totalPrice}.00</h1>
            <button onClick={handleCheckout}>CHECKOUT</button>
        </div>
    )
}