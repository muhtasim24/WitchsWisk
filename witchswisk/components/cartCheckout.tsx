'use client'
import { useCart } from "@/app/context/cartContext";
import type { Product } from "@/lib/types";


type Props = {
    products: Product[];
}

export default function CartCheckout( {products} : Props) {

    const { cartItems } = useCart();

    // I want to display name, quantity and price here and total price

    // do calculations outside of rendering
    // start a running total, starts at 0
    // for each matching product to the cartItem, find the price and add to the total
    const totalPrice : number = cartItems.reduce( (sum, item) => {
        const product = products.find(p => p.id === item.id);
        if (!product) return sum;

        return sum + item.quantity * product.price;
    }, 0);


    return (
        <div className="bg-brand w-100 h-150 rounded-xl flex flex-col">
            <h1 className="text-3xl font-bold">Checkout</h1>
            {cartItems.map(item => {
                const product = products.find(product => product.id === item.id);

                if (!product) return null;
              
                return (
                    <div key = {item.id} className="flex gap-15">
                        <h1> {product.name} </h1>
                        <h1> {item.quantity}x </h1>
                        <h1> ${item.quantity * product.price}.00</h1>
                    </div>
                );
            })}

            <h1>Total Price: ${totalPrice}.00</h1>
            <button>PLACE ORDER</button>
        </div>
    )
}