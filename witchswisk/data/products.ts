
export type Product = {
    id: string
    name: string
    price: number
    image: string
    description: string
    ingredients: string
}

export const products: Product[] = [
    {
        id: "1",
        name: "Chocolate Chip Cookie",
        price: 5.00,
        image: "/cookies/game.png",
        description: "Cookie filled with chocolate chips",
        ingredients: "chocolate, cookie chips, sugar, dough"
    }, 

    {
        id: "2",
        name: "Nutella Cookie",
        price: 5.00,
        image: "/cookies/hyveout.png",
        description: "Chocolate Cookie filled with nutella",
        ingredients: "nutella, sugar, dough, chocolate"
    },

    {
        id: "3",
        name: "Jumbo M&M Cookie",
        price: 5.00,
        image: "/cookies/media.png",
        description: "Chocolate Cookie filled with nutella",
        ingredients: "M&M, sugar, dough, chocolate"
    }
]