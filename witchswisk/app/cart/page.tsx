import CartCheckout from "@/components/cartCheckout";
import CartView from "@/components/cartView";
import { getProducts } from "@/lib/getProducts";

    
export default async function Cart() {
    const products = await getProducts();

    return (
        <div>
            <h1 className="text-5xl font-bold">Shopping Cart</h1>
            <div className="flex gap-50">
                <div>
                    <CartView products = { products } />
                </div>
       
                <div>
                    <CartCheckout products = { products } />
                </div>
            </div>
        </div>
    )
}