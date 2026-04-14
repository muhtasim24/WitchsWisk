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

export function deleteFromCart(id: string) {
    // create a new list and filter the old list by id
    // keep only the id's that dont match the given id
    const filteredList = cart.filter(item => item.id !== id);
    cart = filteredList;
    return cart;
}