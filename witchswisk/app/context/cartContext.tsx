'use client';

import { createContext, ReactNode, useContext, useState } from "react";

type CartProviderProps = {
    children: ReactNode
}

// information our cart item holds
type CartItem = {
    id: string // if we use id, we can associate id with name, and if the name changes in our data, this will update as well
    quantity: number // can get price from price X quantity
}

// what do we need to be able to do with our cart
// add, increment, decrement, remove, how many items in our cart
type CartContextType = {
    // getItemQuantity: (id: string) => number
    // increaseCartQuantity: (id: string) => void // adding to the cart also
    // decreaseCartQuantity: (id: string) => void
    // removeFromCart: (id: string) => void
    cartItems: CartItem[]
    addToCart: (id: string) => void
}


const CartContext = createContext({} as CartContextType);

// custom hook instead of calling useContext everywhere
export function useCart() {
    return useContext(CartContext);
}


export function CartProvider( { children } : CartProviderProps) {
    // need a place to store our cart information, for now using useState to store that
    const[cartItems, setCartItems] = useState<CartItem[]>([])
    
    function addToCart(id: string) {
        setCartItems(currItems => {
            // if we dont find the item, in the arrayList add it
            if (currItems.find(item => item.id === null)) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

        // function increaseCartQuantity(id: string) {
        //     setCartItems(currItems => {
        //     // if we dont have the item in the cart, set quantity to 1
        //     if (currItems.find(item => item.id === id) === null) {
        //         return [...currItems, { id, quantity: 1}]
        //     } else {
        //         // if we found the item, take the current item and increase the quantity by 1
        //         return currItems.map(item => {
        //             if (item.id === id) {
        //                 return {...item, quantity: item.quantity + 1}


    return (
        <CartContext.Provider value = { { cartItems, addToCart } }>
            {children}
        </CartContext.Provider>
    )
}



    // function getItemQuantity(id: number) {
    //     return cartItems.find(item => item.id == id)?.quantity || 0; // if we find item, get quantity else give us 0
    // }

    // function increaseCartQuantity(id: string) {
    //     setCartItems(currItems => {
    //         // if we dont have the item in the cart, set quantity to 1
    //         if (currItems.find(item => item.id === id) === null) {
    //             return [...currItems, { id, quantity: 1}]
    //         } else {
    //             // if we found the item, take the current item and increase the quantity by 1
    //             return currItems.map(item => {
    //                 if (item.id === id) {
    //                     return {...item, quantity: item.quantity + 1}
    //                 } else {
    //                     return item
    //                 }
    //             })
    //         }
    //     })
    // }


    // function decreaseCartQuantity(id: number) {
    //     setCartItems(currItems => {
    //         // if quantity of our item is 1, remove it
    //         if (currItems.find(item => item.id === id)?.quantity === 1) {
    //             // remove all items that match that item's id, and display those that dont match
    //             return currItems.filter(item => item.id != id);
    //         } else {
    //             // if we found the item, take the current item and decrease the quantity by 1
    //             return currItems.map(item => {
    //                 if (item.id === id) {
    //                     return {...item, quantity: item.quantity - 1}
    //                 } else {
    //                     return item
    //                 }
    //             })
    //         }
    //     })
    // }

    // function removeFromCart(id: number) {
    //     setCartItems( currItems => {
    //         return currItems.filter(item => item.id !== id);
    //     })
    // }