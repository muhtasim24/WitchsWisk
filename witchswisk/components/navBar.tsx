'use client'

import { useCart } from "@/app/context/cartContext";
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X} from "lucide-react";

export default function NavBar() {

    const {cartItems, loadCart} = useCart() 
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const cartCount = cartItems.length;

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        console.log("USER SIGNED OUT");
        router.replace("/signUp");
        loadCart();
        console.log(error)
        return error;
    }

    const userActive = async () => {
        const { data: { user} } = await supabase.auth.getUser();

        if(!user) {
            return false
        }

        return true;
    }

    useEffect(() => {
        const checkUser = async () => {
            const active = await userActive();
            setLoggedIn(active);
        };

        checkUser();
    }, []);



    return (
        <div className="relative bg-brand flex items-center justify-between px-6 h-14 rounded">
            <Link href={"/"} className="text-lg">HOME</Link>
            <Link href={"/cookies"} className="text-lg">COOKIES</Link>

            <div className="flex items-center gap-4">
                <Link href={"/signUp"}>SIGN IN</Link>
                <Link href={"/cart"} className="relative">
                    <ShoppingCart size={30}/>

                    {cartCount > 0 && (
                        <span className="absolute -bottom-2 -right-2 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>
                <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 top-full mt-4 w-48 bg-brand rounded-lg shadow-lg p-4">
                            <div className="flex flex-col gap-3">
                                <Link href={"/profile"}>PROFILE</Link>
                                <Link href={"/contact"}>CONTACT</Link>

                                {loggedIn ? (
                                <button onClick={signOut} className="bg-white text-brand hover:text-bg-brand px-6 py-2 rounded-lg font-semibold active:scale-95">Sign Out</button>
                                ) : (
                                    <button><Link href={"/signUp"} className="bg-white text-brand hover:text-bg-brand px-6 py-2 rounded-lg font-semibold active:scale-95">SIGN UP</Link></button>
                                )}

                            </div>


                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}