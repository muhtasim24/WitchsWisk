import { createServerSupabase } from "./supabase/server";
import { Product } from "./types";

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

export async function updateInStockProduct(id: number, inStock: boolean): Promise<Product | null> {
   const supabase = await createServerSupabase();
   const {data , error } = await supabase.from('products').update( {in_stock: inStock}).eq("id", id).select().maybeSingle();

   if (error) {
      console.error(error);
      return null;
   }
   
   if (!data) {
      throw new Error(`No product found with id ${id}`);
   }

   return data;
}