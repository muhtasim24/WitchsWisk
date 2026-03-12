import Card from "@/components/card";
import Search from "@/components/search";
import { getProducts } from "@/lib/getProducts"

export default async function Cookies() {
    const products = await getProducts();

    return (
        <div className="mt-10">
            <Search products={products}/>
        </div>
    )
}