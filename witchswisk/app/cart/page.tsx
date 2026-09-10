import CartCheckout from "@/components/cart/cartCheckout";
import CartView from "@/components/cart/cartView";
import { getProducts } from "@/lib/getProducts";
import { getCart } from "@/lib/cart";

    
export default async function Cart() {
    const cart = await getCart();
    console.log(cart);
    const products = await getProducts();

    return (
        <div>
            <div className="flex flex-col lg:flex-row px-4 sm:px-6 py-10 gap-6">
                <div className="bg-brand w-full lg:w-2/3 p-4 rounded-lg">
                    <h1 className="font-dancing text-3xl font-extrabold mb-4 uppercase">Cart</h1>
                    <CartView products = { products } />
                </div>
       
                <div className="w-full lg:w-1/3 p-4 border rounded-lg bg-brand lg:sticky lg:top-6 lg:self-start">
                    <CartCheckout products = { products } />
                </div>
            </div>
        </div>
    )
}