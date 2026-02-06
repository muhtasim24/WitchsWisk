'use client';
import { Product } from "@/data/products";


type Props = {
    products: Product[];
}

export default function Card( { products } : Props) {
    return (
        <div className="bg-purple-700 w-80 flex flex-col items-center m-8">
            <h1>{products[0].name}</h1>
            <h1>${products[0].price}.00</h1>
            <h1>Ingredients: {products[1].ingredients}</h1>
        </div>
    )
}