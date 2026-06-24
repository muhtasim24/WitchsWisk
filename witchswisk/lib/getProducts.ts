import { products } from "@/data/products";
import { supabase } from "./supabase/client";

// THIS PAGE CHANGES WHEN IMPLEMENT REAL DB
// USED TO ACCESS THE DATA, will change when where we access data from is different

export async function getProducts() {
   const { data, error } = await supabase.from("products").select("*");

   if (error) {
    console.error(error);
    return [];
   }

   return data;
}