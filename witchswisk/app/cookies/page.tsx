import Card from "@/components/card";
import { getProducts } from "@/lib/getProducts"

export default async function Cookies() {
    const products = await getProducts();

    return (
        <div>
            <h1>Cookies</h1>

            <div className="flex gap-3 grid grid-cols-3 ">
                {products.map( product => (
                    <Card key={product.id} product = {product}></Card>
                ))}
            </div>

        </div>
    )
}