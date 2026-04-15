'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type CartProviderProps = {
    children: ReactNode
}

// information our cart item holds
export type CartItem = {
    id: string // if we use id, we can associate id with name, and if the name changes in our data, this will update as well
    quantity: number // can get price from price X quantity
}

// what do we need to be able to do with our cart
// add, increment, decrement, remove, how many items in our cart
type CartContextType = {
    // getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void // adding to the cart also
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    cartItems: CartItem[]
    addToCart: (id: string) => void
    loadCart: () => Promise<void>
}


const CartContext = createContext({} as CartContextType);

// custom hook instead of calling useContext everywhere
export function useCart() {
    return useContext(CartContext);
}


export function CartProvider( { children } : CartProviderProps) {
    // need a place to store our cart information, for now using useState to store that
    const[cartItems, setCartItems] = useState<CartItem[]>([])
    console.log(cartItems);

    useEffect( () => {
        loadCart();
    }, []);

    function loadCart() {
        fetch("/api/cart", {method: "GET"})
            .then( (response) => response.json())
            .then( (data) => setCartItems(data));
    }

    async function addToCart(id: string) {
        console.log("ADDING TO CART: ", id);
        setCartItems(currItems => {
            // if we dont find the item, in the arrayList add it
            const findItem = currItems.find(item => item.id === id);

            if (!findItem) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems;
            }
        });

        await fetch("/api/cart", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( {id})
        });
    }

    async function increaseCartQuantity(id: string) {
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

        await fetch("/api/cart", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( {id: id, action: "increasing"} )
        })
    }

    async function decreaseCartQuantity(id: string) {
        console.log("decreasing count for: ", id);
        setCartItems(currItems => {
            return currItems.map(item => {
                if (item.id === id && item.quantity !== 1) {
                    return {...item, quantity: item.quantity - 1}
                } else {
                    return item;
                }
            })
        })

        await fetch("/api/cart", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( {id: id, action: "decreasing"} )
        })
    }

    async function removeFromCart(id: string) {
        console.log("REMOVING FROM CART", id)
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
        
        // make backend request to delete
        await fetch("/api/cart", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( {id} ),
        })
    }

    return (
        <CartContext.Provider value = { { cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart } }>
            {children}
        </CartContext.Provider>
    )
}

    // function removeFromCart(id: number) {
    //     setCartItems( currItems => {
    //         return currItems.filter(item => item.id !== id);
    //     })
    // }