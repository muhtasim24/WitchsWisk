'use client'
import { useCart } from "@/app/context/cartContext";
import { Product } from "@/data/products";
import CartSlot from "./cartSlot";

type Props = {
    products: Product[];
}

export default function CartView( { products } : Props) {

    const { cartItems } = useCart();

    return (
        // go through cart Items and products
        // everyTime cartItem id matches with a product's id, call Card Item component to display that item in the cart
        <div>
            {cartItems.map(cartItem => {
                const product = products.find(product => product.id === cartItem.id);
                if (product) {
                    return <CartSlot 
                                key = {cartItem.id}
                                item = {cartItem} 
                                product={product} 
                            />
                }
            })}
        </div>
    )
}