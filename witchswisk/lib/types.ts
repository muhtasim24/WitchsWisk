import { Tables } from "./database.types"


export type Product = Tables<'products'>;
export type ProductWithImages = Product & {
    product_images: {
        image: string,
    }[],
}

// information our cart item holds
export type CartItem = {
    //id: number // if we use id, we can associate id with name, and if the name changes in our data, this will update as well
    product_id: number
    //user_id: number
    quantity: number // can get price from price X quantity
}

// export type Order = {
//     id: string,
//     total_price: number,
//     created_at: string,
//     status: string,
//     address: string
// }

export type Order = Tables<'orders'>;

export type OrderItem = {
    name: string
    checkout_price: number,
    
}

export type CartProduct = {
    quantity: number;
    products: {
        name: string
    };
}
