import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import { createServerSupabase } from "@/lib/supabase/server";
import { getCart } from "@/lib/cart";

export async function POST() {
    const supabase = await createServerSupabase();
    const { data: { user }} = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase.from('cart_items').select('quantity, products(*)').eq('user_id', user.id);
    if (!data) return;
    try {
        // below grabs site URL dynamically
        const headersList = await headers()
        const origin = headersList.get('origin')

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create( {
            line_items: data.map(cartItem => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: cartItem.products.name
                        descripto
                    }
                }
            })
            )
        })

    } catch (err) {

    }
}