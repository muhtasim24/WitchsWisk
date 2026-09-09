'use client'

import { useCart } from "@/app/context/cartContext";
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function NavBar() {

    const { cartItems, loadCart } = useCart()
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
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
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
        <div className="relative bg-brand flex items-center justify-between px-4 sm:px-6">

            {/* Left: nav links (hidden on mobile) */}
            <div className="flex-1 hidden sm:flex items-center gap-6">
                <Link href={"/"} className="text-lg font-dancing font-bold">HOME</Link>
                <Link href={"/cookies"} className="text-lg font-dancing font-bold">COOKIES</Link>
            </div>

            {/* Center: logo */}
            <div className="flex justify-start sm:justify-center sm:flex-1">
                <Link href={"/"}>
                    <Image src="/logo.webp" alt="A Witch's Whisk" width={70} height={70} priority />
                </Link>
            </div>

            {/* Right: sign in, cart, menu */}
            <div className="flex-1 flex items-center justify-end gap-4">
                <Link href={"/cookies"} className="text-lg font-dancing md:hidden">COOKIES</Link>
                <Link href={"/cart"} className="relative">
                    <ShoppingCart size={30} />
                    {cartCount > 0 && (
                        <span className="absolute -bottom-2 -right-2 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>

                <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 top-full mt-4 w-48 bg-brand rounded-lg shadow-lg p-4 z-50">
                            <div className="flex flex-col gap-3">
                                {/* Nav links, shown here only on mobile */}
                                <Link href={"/"} className="sm:hidden font-dancing font-bold">HOME</Link>
                                <Link href={"/cart"} className="sm:hidden font-dancing font-bold">CART</Link>
                                <Link href={"/profile"} className="font-dancing font-bold">PROFILE</Link>

                                {loggedIn ? (
                                    <button onClick={signOut} className="bg-white text-brand hover:text-bg-brand px-6 py-2 rounded-lg font-bold active:scale-95 font-dancing">Sign Out</button>
                                ) : (
                                    <Link href={"/signUp"} className="bg-white text-brand hover:text-bg-brand px-6 py-2 rounded-lg font-bold active:scale-95 text-center font-dancing">SIGN UP</Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}