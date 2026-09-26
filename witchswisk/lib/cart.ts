import { cookies } from "next/headers";
import { createServerSupabase } from "./supabase/server";
import { CartItem, CartProduct } from "./types";
import CartSlot from "@/components/cart/cartSlot";
import { supabaseAdmin } from "./supabase/admin";


export async function getCart() {
    const supabase = await createServerSupabase();

    const { data: { user }} = await supabase.auth.getUser();

    // if user doesnt exist, reutnr []
    if (!user) return [];

    const { data, error } = await supabase.from('cart_items').select('*').eq('user_id', user.id);
    if (!data) return;

    if (error || !data) {
        console.error(error);
        return [];
    }

    return data;
}

export async function addToCart(id: number) {
    const supabase = await createServerSupabase();
    const { data: { user }} = await supabase.auth.getUser();
    
    // if user doesnt exist, reutnr []
    if (!user) return [];
    
    const { data, error } = await supabase
        .from('cart_items')
        .insert({product_id: id, quantity: 1, user_id: user.id})
        .select();

    if (error || !data) {
        console.log(error);
        return;
    }
    console.log(data);
    return data;
}

export async function deleteFromCart(id: number) {
    // create a new list and filter the old list by id
    // keep only the id's that dont match the given id

    const supabase = await createServerSupabase();
    const { data: { user }} = await supabase.auth.getUser();
    
    // if user doesnt exist, reutnr []
    if (!user) return [];

    const { data, error } = await supabase
        .from('cart_items')
        .delete()
        .eq('product_id', id).eq('user_id', user.id)
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
    const supabase = await createServerSupabase();
    const { data: { user }} = await supabase.auth.getUser();
    
    // if user doesnt exist, reutnr []
    if (!user) return [];

    const response= await supabase
        .from('cart_items')
        .select('quantity')
        .eq('product_id', id).eq('user_id', user.id)
    
    let updatedQuantity = 0;
    if (response.data) {
        updatedQuantity = response.data[0].quantity + 1
    }
    
    const { data, error } = await supabase
        .from('cart_items')
        .update({quantity: updatedQuantity}) 
        .eq('product_id', id).eq('user_id', user.id)
        .select()
    
    
    if (error) {
        console.log(error)
        return;
    }

    console.log(data);
    return(data);
}

export async function decreaseQuantity(id: number) {
    const supabase = await createServerSupabase();
    const { data: { user }} = await supabase.auth.getUser();
    
    // if user doesnt exist, reutnr []
    if (!user) return [];

    const response = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('product_id', id).eq('user_id', user.id)

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
        .eq('product_id', id).eq('user_id', user.id)
        .select();


    if (error) {
        console.log(error);
        return;
    }

    console.log(data);
    return data;
}

export async function checkoutCart(userId: string, address: string, name: string, email: string, totalPrice: number, session_id: string) {
    // so I want to create an entry for orders, so create an insert into 
    // get everything from cart
    const supabase = supabaseAdmin;
    //const cart = await supabase.from('cart_items').select('*').eq('user_id', userId);
    const cart = await supabase.from('cart_items').select('quantity, product_id, products(*)').eq('user_id', userId);

    if (cart.error) {
        console.log(cart.error);
        return { success: false, error: 'Failed to load cart' };
    }

    if (!cart.data || cart.data.length === 0) {
        console.log(`No cart items found for user ${userId}, session ${session_id}`);
        return { success: false, error: 'Cart is empty' };
    }

    const orders = await supabase
        .from('orders')
        .insert( {user_id: userId, total_price: totalPrice, status: "Paid", address: address, name: name, email: email, stripe_session_id: session_id})
        .select()

    
    if (orders.error) {
        if (orders.error.code === '23505') {
            // unique constraint violation — another request already inserted this session
            console.log('Duplicate session, already processed by another request');
            const { data: existing, error: fetchError } = await supabase
                .from('orders')
                .select('*')
                .eq('stripe_session_id', session_id)
                .single();
            if (fetchError || !existing) {
                console.log(fetchError);
                return { success: false, error: "Duplicate detected but failed to fetch existing order"}
            }
            return { success: true, order: existing };
        }
        console.log(orders.error);
        return { success: false, error: orders.error.message };
    }

    if (!orders.data || orders.data.length === 0) {
        return { success: false, error: "Order insert returned no data" }; 
    }

    // orders has the order_id, i can create the order_items 

    const orderItems = cart.data.map(cartItem => ({
        order_id: orders.data[0].id, 
        product_name: cartItem.products.name, 
        checkout_price: cartItem.products.price, 
        product_id: cartItem.product_id, 
        quantity: cartItem.quantity
    }));
    
    const orderReciept = await supabase
        .from('order_items')
        .insert(orderItems)
        .select()

    if (!orderReciept.data || orderReciept.error) {
        console.log(orderReciept.error);
        return { success: false, error: 'Failed to create order items'};
    }
    // already have list of product_ids that are in the cart, use that to call deletefromCart on the product id
    
    const deleteCart = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .select();

    if (!deleteCart.data || deleteCart.error) {
        console.log(deleteCart.error);
        return deleteCart.error;
    }

    return { success: true, order: orders.data[0]};

}