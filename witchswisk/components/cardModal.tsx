'use client';
import { Product } from "@/data/products";


type Props = {
    product: Product;
    onClose?: () => void;
}

export default function CardModal( {product} : Props) {

    return (
        <div>
            <h1>WE ARRIVED AT THE MODAL BITCH</h1>
        </div>
    )
}