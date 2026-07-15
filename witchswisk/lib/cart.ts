import { cookies } from "next/headers";
import { createServerSupabase } from "./supabase/server";
import { CartItem } from "./types";
import CartSlot from "@/components/cart/cartSlot";


export async function getCart() {
    const supabase = await createServerSupabase();

    const { data: { user }} = await supabase.auth.getUser();

    // if user doesnt exist, reutnr []
    if (!user) return [];

    const { data, error } = await supabase.from('cart_items').select('*').eq('user_id', user.id);
    console.log(user.id);
    
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
    // const updateQuantity = cart.map(item => {
    //     if (item.id === id) {
    //         return {...item, quantity: item.quantity + 1}
    //     }
    //     return item
    // })
    // cart = updateQuantity;
    // return cart;
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

export async function checkoutCart(userId: string) {
    // so I want to create an entry for orders, so create an insert into 
    // get everything from cart
    const supabase = await createServerSupabase();
    const cart = await supabase.from('cart_items').select('*').eq('user_id', userId);
    console.log(cart.data);
    if (cart.error || !cart.data) {
        console.log(cart.error);
        return;
    }

    const productsInCart = await supabase.from('cart_items').select('product_id').eq('user_id', userId)
    if (!productsInCart.data) return;
    
    const productIds = productsInCart.data.map(product => product.product_id);


    const findProducts = await supabase.from('products').select('*').in('id', productIds)
    if (!findProducts.data) return findProducts.error;

    // loop through cart, match up product with each product id get the price, calcualte total price 
    let totalPrice = 0
    for (const cartItems of cart.data) {
        const matchedProduct = findProducts.data.find(product => product.id == cartItems.product_id);
        totalPrice += matchedProduct.price * cartItems.quantity
    }

    // so got all items in the cart, and total price, need to create orders now

    const orders = await supabase
        .from('orders')
        .insert( {user_id: userId, total_price: totalPrice, status: "processing"})
        .select()

    if (!orders.data || orders.error) {
        console.log(orders.error);
        return orders.error;
    }

    console.log("ORDERS", orders.data);
    console.log("ORDER_ID", orders.data[0].id)

    // orders has the order_id, i can create the order_items 

    const orderItems = cart.data.map(cartItem => {
        const matchedProduct = findProducts.data.find(product => product.id == cartItem.product_id);
        console.log("THIS IS CARTITEM", cartItem);
        return {order_id: orders.data[0].id, checkout_price: matchedProduct.price, product_id: cartItem.product_id, quantity: cartItem.quantity}
    })
    console.log("ORDER ITEMS", orderItems);
    
    const orderReciept = await supabase
        .from('order_items')
        .insert(orderItems)
        .select()

    if (!orderReciept.data || orderReciept.error) {
        console.log(orderReciept.error);
        return orderReciept.error;
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

    console.log("DELETED", deleteCart.data);
    return orders;

}