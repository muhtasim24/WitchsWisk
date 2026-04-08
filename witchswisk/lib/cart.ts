import { CartItem } from "./types";

let cart: CartItem[] = [];

export function getCart() {
    return cart;
}

export function addToCart(id: string) {
    const findItem = cart.find(item => item.id === id);

    // if item doesnt exist in the cart, add to it
    if (!findItem) {
        cart.push( {id, quantity: 1});
    }

    return cart;
}