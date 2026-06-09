

export type Product = {
    id: number
    name: string
    price: number
    type: string
    image: string
    description: string
    ingredients: string
}


// information our cart item holds
export type CartItem = {
    //id: number // if we use id, we can associate id with name, and if the name changes in our data, this will update as well
    product_id: number
    //user_id: number
    quantity: number // can get price from price X quantity
}