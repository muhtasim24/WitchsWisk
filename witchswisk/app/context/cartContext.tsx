'use client';

import { createContext, ReactNode, useContext, useEffect, useState, useRef } from "react";

type CartProviderProps = {
    children: ReactNode
}

// information our cart item holds
export type CartItem = {
    //id: number // if we use id, we can associate id with name, and if the name changes in our data, this will update as well
    product_id: number
    //user_id: number
    quantity: number // can get price from price X quantity
}

// what do we need to be able to do with our cart
// add, increment, decrement, remove, how many items in our cart
type CartContextType = {
    // getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: number) => void // adding to the cart also
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartItems: CartItem[]
    addToCart: (id: number) => void
    loadCart: () => Promise<void>
    isLoading: boolean;
}


const CartContext = createContext({} as CartContextType);

// custom hook instead of calling useContext everywhere
export function useCart() {
    return useContext(CartContext);
}


export function CartProvider( { children } : CartProviderProps) {
    console.log("IN CART PROVIDER");
    // need a place to store our cart information, for now using useState to store that
    const[cartItems, setCartItems] = useState<CartItem[]>([])
    const[isLoading, setIsLoading] = useState(false);
    const lockButton = useRef(false);
    console.log("LOADING:", isLoading);
    console.log("CONTEXT cartItems:", cartItems);

    useEffect( () => {
        console.log("USE EFFECT FIRE");
        loadCart();
    }, []);

    async function loadCart() {
        try {
            const res = await fetch("/api/cart");
            
            if (!res.ok) {
                throw new Error("Failed to fetch cart");
            };

            const data = await res.json();
            console.log("DATA", data);
            setCartItems(data);
        } catch(error) {
            console.log("LOAD CART FAILED", error);
        }
    }

    // we get the product.id
    async function addToCart(id: number) {
        console.log("ADDING TO CART: producct_id:", id);
        setCartItems(currItems => {
            // if we dont find the item, in the arrayList add it
            const findItem = currItems.find(item => item.product_id === id);

            if (!findItem) {
                return [...currItems, {product_id: id, quantity: 1}]
            } else {
                return currItems;
            }
        });
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {id})
            });
            // check the HTTP error, if its anything but 200s status
            if (!res.ok) {
                throw new Error("Failed to add to cart"); // manually throw an error
            }
        }
        catch(error) {
            console.log("ADD TO CART FAILED", error);
            // reload the cart before error
            loadCart();
        }
    }

    async function increaseCartQuantity(id: number) {
        if (lockButton.current) return;

        lockButton.current = true;
        console.log("increasing count for: ", id);
        setIsLoading(true);

        setCartItems(currItems => {
            return currItems.map(item => {
                if (item.product_id === id) {
                    return {...item, quantity: item.quantity + 1}
                } else {
                    return item
                }
            })
        })
        
        try {
            const res = await fetch("/api/cart", {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {id: id, action: "increasing"} )
            });
            if (!res.ok) {
                throw new Error("Failed to increase quantity");
            }
        }
        catch(error) {
            console.log("Failed to increase item", error);
            loadCart();
        } finally {
            setTimeout( () => {
                lockButton.current = false;
                setIsLoading(false);
            }, 300);
        }
    }

    async function decreaseCartQuantity(id: number) {
        if (lockButton.current) return;

        lockButton.current = true;
        console.log("decreasing count for: ", id);
        setIsLoading(true);
        setCartItems(currItems => {
            return currItems.map(item => {
                if (item.product_id === id && item.quantity !== 1) {
                    return {...item, quantity: item.quantity - 1}
                } else {
                    return item;
                }
            })
        })

        try {
            const res = await fetch("/api/cart", {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {id: id, action: "decreasing"} )
            });
            if (!res.ok) {
                throw new Error("Failed to decrease quantity");
            };
        }
        catch(error) {
            console.log("FAILED TO DECREASE", error);
            loadCart();
        }
        finally {
            setTimeout( () => {
                lockButton.current = false;
                setIsLoading(false);
            }, 300);
        }
    }

    async function removeFromCart(id: number) {
        if (lockButton.current) return;

        lockButton.current = true;
        console.log("REMOVING FROM CART", id)
        setIsLoading(true);
        setCartItems(currItems => {
            return currItems.filter(item => item.product_id !== id)
        })
        
        // make backend request to delete
        try {
            const res = await fetch("/api/cart", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {id} ),
            });
            if (!res.ok) {
                throw new Error("Failed to remove from cart");
            }
        }
        catch(error) {
            console.log("Failed to remove", error);
            loadCart();
        }
        finally {
            setTimeout( () => {
                lockButton.current = false;
                setIsLoading(false);
            }, 300);
        }
    }

    return (
        <CartContext.Provider value = { { cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart, loadCart, isLoading } }>
            {children}
        </CartContext.Provider>
    )

}
