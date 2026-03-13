'use client'
import { useCart } from "@/app/context/cartContext";
import { Product } from "@/data/products";


type Props = {
    products: Product[];
}

export default function CartCheckout( {products} : Props) {

    const { cartItems } = useCart();

    // I want to display name, quantity and price here and total price

    let totalPrice : number = 0;


    return (
        <div className="bg-brand w-100 h-150 rounded-xl flex flex-col">
            <h1 className="text-3xl font-bold">Checkout</h1>
            {cartItems.map(item => {
                const product = products.find(product => product.id === item.id);

                if (product) {
                    const price: number = item.quantity * product.price
                    totalPrice = totalPrice + price
                    return (
                        <div className="flex gap-15">
                            <h1> {product.name} </h1>
                            <h1> {item.quantity}x </h1>
                            <h1> ${price}.00</h1>
                        </div>
                    )
                }
            })}

            <h1>Total Price: ${totalPrice}.00</h1>
            <button>PLACE ORDER</button>
        </div>
    )
}