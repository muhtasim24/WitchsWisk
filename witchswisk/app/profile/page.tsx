import { getOrder, getOrderReciept } from "@/lib/orders"


export default async function Profile() {
    // should have user name, email, address,
    const orders = await getOrder();
    const orderRecipet = await getOrderReciept();

    return (
        <div>
            <h1>user profile</h1>
            <h1>Orders</h1>
            
        </div>
    )
}