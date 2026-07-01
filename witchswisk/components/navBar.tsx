'use client'

import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function NavBar() {


    const router = useRouter();

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        console.log("USER SIGNED OUT");
        router.push("/");
        setTimeout(() => {
            router.refresh()
        }, 0)
        console.log(error)
        return error;
    }
    return (
        <div className="bg-brand h-12 text-4xl flex justify-between">
            <Link href={"/"}>HOME</Link>
            <Link href={"/cookies"}>COOKIES</Link>
            <Link href={"/contact"}>CONTACT</Link>
            <Link href={"/signUp"}>SIGN UP</Link>
            <Link href={"/cart"}>CART</Link>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}