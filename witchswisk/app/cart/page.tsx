import CartCheckout from "@/components/cart/cartCheckout";
import CartView from "@/components/cart/cartView";
import { getProducts } from "@/lib/getProducts";
import { getCart } from "@/lib/cart";

    
export default async function Cart() {
    const cart = await getCart();
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