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

// find the cartItem that matches the id
// go through every cart item, till we find the one with the id that matches, return everything before so it stays the same
// and only update the correct item's quantity
export function increaseQuantity(id: string) {
    const updateQuantity = cart.map(item => {
        if (item.id === id) {
            return {...item, quantity: item.quantity + 1}
        }
        return item
    })
    cart = updateQuantity;
    return cart;
}

export function decreaseQuantity(id: string) {
    const updateQuantity = cart.map(item => {

        if (item.id === id && item.quantity !== 1) {
            return {...item, quantity: item.quantity - 1}
        }
        return item
    })
    cart = updateQuantity
    return cart;
}