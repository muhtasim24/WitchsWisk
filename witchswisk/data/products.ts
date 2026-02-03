
export type Product = {
    id: string
    name: string
    price: number
    description: string
    ingredients: string
}

export const products: Product[] = [
    {
        id: "1",
        name: "Chocolate Chip Cookie",
        price: 4.5,
        description: "Cookie filled with chocolate chips",
        ingredients: "chocolate, cookie chips, sugar, dough"
    }, 

    {
        id: "2",
        name: "Nutella Cookie",
        price: 5,
        description: "Chocolate Cookie filled with nutella",
        ingredients: "nutella, sugar, dough, chocolate"
    }
]