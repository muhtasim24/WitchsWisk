'use client'
import { Product, products } from "@/data/products";

import { CartItem, useCart } from "@/app/context/cartContext"

type Props = {
    item: CartItem;
    product: Product;
}

export default function CartSlot( {item, product}: Props) {
    const {cartItems, addToCart} = useCart();

    return (
        <div>
            <h1>{product.name}</h1>
            <h1>Quantity: {item.quantity}</h1>
            <h1>{product.price}</h1>
        </div>
    )
}