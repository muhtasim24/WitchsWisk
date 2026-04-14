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
export function increaseCartQuantity(id: string) {
    const findItem = cart.find(item => item.id === id);

    if (findItem) {

    }
}

    function increaseCartQuantity(id: string) {
        console.log("increasing count for: ", id);
        setCartItems(currItems => {
            return currItems.map(item => {
                if (item.id === id) {
                    return {...item, quantity: item.quantity + 1}
                } else {
                    return item
                }
            })
        })
    }

    function decreaseCartQuantity(id: string) {
        console.log("decreasing count for: ", id);
        setCartItems(currItems => {
            return currItems.map(item => {
                if (item.id === id && item.quantity !== 1) {
                    return {...item, quantity: item.quantity - 1}
                } else {
                    return item;
                }
            }
            )
        })
    }
export function decreaseCartQuantity(id: string) {

}