import { createServerSupabase } from "./supabase/server";
import { CartItem } from "./types";
import CartSlot from "@/components/cartSlot";

let cart: CartItem[] = [];
let userId = "";

export async function getCart() {
    const supabase = await createServerSupabase();
    const {data, error} = await supabase.auth.getSession();
    console.log("SESSIOn", data);
    const user = (await supabase.auth.getUser()).data.user;
    console.log(user);
    let user_Id : string | null = null;
    if (user) {
        user_Id = user.id;
    }
    console.log("HELLO", user_Id)

    // const { data, error } = await supabase.from('cart_items').select('*').eq('user_id', user_Id);
    
    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export async function addToCart(id: number) {
    const user = (await supabase.auth.getUser()).data.user;
    if (user) {
        userId = user.id;
    };
    
    const { data, error } = await supabase
        .from('cart_items')
        .insert({product_id: id, quantity: 1, user_id: userId})
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
        .eq('product_id', id).eq('user_id', userId)
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

    const response= await supabase
        .from('cart_items')
        .select('quantity')
        .eq('product_id', id).eq('user_id', userId)
    
    let updatedQuantity = 0;
    if (response.data) {
        updatedQuantity = response.data[0].quantity + 1
    }
    
    const { data, error } = await supabase
        .from('cart_items')
        .update({quantity: updatedQuantity}) 
        .eq('product_id', id).eq('user_id', userId)
        .select()
    
    
    if (error) {
        console.log(error)
        return;
    }

    console.log(data);
    return(data);
}

export async function decreaseQuantity(id: number) {
    const response = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('product_id', id).eq('user_id', userId)

    let updatedQuantity = 0;
    if (response.data) {
        const quantity = response.data[0].quantity
        if (quantity == 1) {
            deleteFromCart(id);
        }
        else {
            updatedQuantity = quantity - 1;
        }
    }

    const { data , error} = await supabase
        .from('cart_items')
        .update({quantity: updatedQuantity})
        .eq('product_id', id).eq('user_id', userId)
        .select();


    if (error) {
        console.log(error);
        return;
    }

    console.log(data);
    return data;
}