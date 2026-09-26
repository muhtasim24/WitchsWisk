import AdminSearch from "@/components/admin/adminSearch";
import Search from "@/components/product/search";
import { getProducts } from "@/lib/getProducts";


export default async function AdminProducts() {
    const products = await getProducts();
    return (
        <div>
            <h1>ADMIN PRODUCTS</h1>
            <h1>SET COOKIES OUT OF ORDER HERE</h1>
            <AdminSearch products={products}/>
        </div>
    )
}