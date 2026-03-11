import CartView from "@/components/cartView";
import { getProducts } from "@/lib/getProducts";

    
export default async function Cart() {
    const products = await getProducts();

    return (
        <div>
            <h1 className="text-5xl font-bold">Shopping Cart</h1>
            <CartView products = { products } />
        </div>
    )
}