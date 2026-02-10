import Card from "@/components/card";
import SearchProduct from "@/components/searchProduct";
import { getProducts } from "@/lib/getProducts"

export default async function Cookies() {
    const products = await getProducts();

    return (
        <div>
            <h1>Cookies</h1>
            <SearchProduct products={products}/>


        </div>
    )
}