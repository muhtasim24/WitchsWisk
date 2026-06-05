import { CartItem } from "./types";
import { supabase } from "./supabaseClient";
import CartSlot from "@/components/cartSlot";

let cart: CartItem[] = [];

export async function getCart() {
    const { data, error } = await supabase.from('cart_items').select('*').eq('user_id', 1);
    
    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export async function addToCart(id: number) {
    const { data, error } = await supabase
        .from('cart_items')
        .insert({product_id: id, quantity: 1, user_id: 2})
        .select();

    if (error) {
        console.log(error);
        return;
    }
    console.log(data);
    return data;
}

export async function deleteFromCart(id: number) {
    // create a new list and filter the old list by id
    // keep only the id's that dont match the given id

    const { data, error } = await supabase
        .from('cart_items')
        .delete()
        .eq('product_id', id).eq('user_id', 1)
        .select()

    if (error) {
        console.log(error);
        return;
    }

    console.log(data);
    return data;
}

// find the cartItem that matches the id
// go through every cart item, till we find the one with the id that matches, return everything before so it stays the same
// and only update the correct item's quantity
export async function increaseQuantity(id: number) {
    // const updateQuantity = cart.map(item => {
    //     if (item.id === id) {
    //         return {...item, quantity: item.quantity + 1}
    //     }
    //     return item
    // })
    // cart = updateQuantity;
    // return cart;

    let { data, error } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('product_id', id).eq('user_id', 1)

    console.log(data);
        

    if (error) {
        console.log(error)
        return;
    }
}

export function decreaseQuantity(id: number) {
    const updateQuantity = cart.map(item => {

        if (item.id === id && item.quantity !== 1) {
            return {...item, quantity: item.quantity - 1}
        }
        return item
    })
    cart = updateQuantity
    return cart;
}