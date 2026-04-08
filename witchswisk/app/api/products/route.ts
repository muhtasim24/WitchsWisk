import { getProducts } from "@/lib/getProducts";


export async function GET() {
    const products = await getProducts();
    return Response.json(products) // before sending the products, we send data as json
}