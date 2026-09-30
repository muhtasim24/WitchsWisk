'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

type Props = {
     orderId: string,
     status: string
}

export default function UpdateOrderBtn( {orderId, status}: Props) {
    const [updateStatus, setUpdateStatus] = useState(status);    
    const router = useRouter();
    
    async function handleUpdate() {
        if (updateStatus === "Mark as Shipped") {
            console.log("SETTING TO SHIPPED")
            setUpdateStatus("Mark as Delivered");
            try {
                const res = await fetch("/api/orders", {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify( {id: orderId, newStatus: "Shipped"} )
                })

                if (!res.ok) throw new Error("Failted to set order as Shipped")
                router.refresh(); 

                } catch (err) {
                console.log("Failed to set Status to Delviered")
            }
        }
        else if (updateStatus === "Mark as Delivered") {
            console.log("SETTING TO DELIVERED");
            try {
                const res = await fetch("/api/orders", {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify( {id: orderId, newStatus: "Delivered"} )
                })

                if (!res.ok) throw new Error("Failted to set order as Delivered")
                router.refresh(); 
            
               } catch (err) {
                console.log("Failed to set Status to Delviered")
               }
            }
        }

    return (
        <button 
        onClick={handleUpdate}
        className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand hover:text-bg-brand cursor-pointer hover:scale-105">
            {updateStatus}
        </button>
    )
}
