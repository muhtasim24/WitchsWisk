import CartCheckout from "@/components/cart/cartCheckout";
import CartView from "@/components/cart/cartView";
import { getProducts } from "@/lib/getProducts";
import { getCart } from "@/lib/cart";

    
export default async function Cart() {
    const cart = await getCart();
    const products = await getProducts();

    return (
        <div>
            <div className="flex flex-row px-6 py-10 min-h-[calc(100vh-4rem)] gap-6">
                <div className="w-2/3 p-4 bg-brand rounded-lg">
                    <h1 className="text-3xl font-bold mb-4">CART</h1>
                    <CartView products = { products } />
                </div>
       
                <div className="w-1/3 p-4 border rounded-lg bg-brand p-4">
                    <CartCheckout products = { products } />
                </div>
            </div>
        </div>
    )
}