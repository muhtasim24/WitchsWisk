'use client';
import { Product } from "@/data/products";


type Props = {
    products: Product[];
}

export default function Card( { products } : Props) {
    return (
        <div>
            <h1>{products[0].name}</h1>
            <h1>{products[1].name}</h1>
            <h1>{products[1].ingredients}</h1>
        </div>
    )
}