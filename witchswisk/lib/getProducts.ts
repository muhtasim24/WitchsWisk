import { createServerSupabase } from "./supabase/server";
import { Product, ProductWithImages } from "./types";

// THIS PAGE CHANGES WHEN IMPLEMENT REAL DB
// USED TO ACCESS THE DATA, will change when where we access data from is different

export async function getProducts(): Promise<Product[]> {
   const supabase = await createServerSupabase();
   //const { data, error } = await supabase.from("products").select("*, product_images(image)");
   const { data, error } = await supabase.from("products").select("*").order("in_stock", { ascending: false }).order("id", { ascending: true });

   if (error) {
    console.error(error);
    return [];
   }

   return data;
}