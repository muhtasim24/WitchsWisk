import Card from "@/components/product/card";
import Search from "@/components/product/search";
import { getProducts } from "@/lib/getProducts"

export const dynamic = 'force-dynamic';

export default async function Cookies() {
    const products = await getProducts();

    return (
        <div className="mt-6 p-6">
            <Search products={products}/>
        </div>
    )
}