import { products } from "@/data/products";

// THIS PAGE CHANGES WHEN IMPLEMENT REAL DB
// USED TO ACCESS THE DATA, will change when where we access data from is different

export async function getProducts() {
    return products;
}