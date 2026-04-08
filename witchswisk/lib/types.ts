

export type Product = {
    id: string
    name: string
    price: number
    type: string
    image: string
    description: string
    ingredients: string
}


// information our cart item holds
export type CartItem = {
    id: string // if we use id, we can associate id with name, and if the name changes in our data, this will update as well
    quantity: number // can get price from price X quantity
}