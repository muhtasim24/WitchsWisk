'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartContext";


export default function UserForm() {
    const {loadCart} = useCart() 
    const router = useRouter();
    const [loginMode, setLoginMode] = useState("signup");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    useEffect( () => {
        getUser();
    }, []);

    async function getUser() {
        try {
            const res = await supabase.auth.getUser();
            const user = res.data.user;
            if (user) {
                console.log(user);
                console.log(user.id);
                return user.id
            }
            
        } catch(error) {
            console.log("LOAD CART FAILED", error);
        }
    }

    async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const {data, error} = await supabase.auth.signUp(
            {
                email: userEmail,
                password: userPassword,
            }
        )

        if(error) {
            console.log(error);
        } else{
            console.log("USER REGISTERED")
        }

        console.log(userEmail);
        console.log(data);
        console.log(data.user?.id);
        if (data.user) {
            return createUser(data.user.id);
        } else {
            console.log(error);
        }
    }

    async function handleSignIn(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword( {
            email: userEmail,
            password: userPassword
        })

        if (error) {
            console.log(error)
        } else {
            console.log('user logged in');
        }

        console.log(data);
        setFirstName("");
        setLastName("");
        setUserEmail("");
        setUserPassword("");

        router.replace("/")
        loadCart();
        return data;
    }

    async function createUser(userId:string) {
        const {data, error} = await supabase
        .from("users")
        .insert( {id: userId, first_name: firstName, last_name: lastName})
        .select()

        if (error) {
            console.log(error);
            return;
        }
        
        console.log(data);
        setFirstName("");
        setLastName("");
        setUserEmail("");
        setUserPassword("");
        
        router.replace("/");
        return data;
    }

    function handleLoginMode(mode: string) {
        if(mode === "signin") {
            setLoginMode("signin");
        } else {
            setLoginMode("signup");
        }
        setFirstName("");
        setLastName("");
        setUserEmail("");
        setUserPassword("");
    }
    
    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
            {loginMode === "signup" && (
            <div className="flex flex-col gap-6">
                <h1 className="text-lg font-bold flex items-center justify-center">CREATE AN ACCOUNT</h1>
                <form onSubmit={handleSignUp}>
                    <h1>First Name:</h1>
                    <input className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="text" value={firstName} onChange={ (e) => setFirstName(e.target.value)}></input>

                    <h1>Last Name:</h1>
                    <input className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="text" value={lastName} onChange={ (e) => setLastName(e.target.value)}></input>

                    <h1>Email:</h1>
                    <input className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="email" value={userEmail} onChange={ (e) => setUserEmail(e.target.value)}></input>

                    <h1>Password:</h1>
                    <input className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="password" value={userPassword} onChange={ (e) => setUserPassword(e.target.value)}></input>
                    
                    <button type="submit" className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand items-center">Sign Up</button>
                </form>
                <button onClick={() => handleLoginMode("signin")} className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand">Log In</button>
            </div>
            )}

            {loginMode === "signin" && (
            <div className="flex flex-col gap-6">
                <h1 className="text-lg font-bold flex items-center justify-center">LOGIN TO YOUR ACCOUNT</h1>
                <form onSubmit={handleSignIn}>
                    <h1>Email:</h1>
                    <input className="w-full bg-purple-400 rounded-md  h-8 text-black border border-black px-2" type="email" value={userEmail} onChange={ (e) => setUserEmail(e.target.value)}></input>

                    <h1>Password:</h1>
                    <input className="w-full bg-purple-400 rounded-md  h-8 text-black border border-black px-2" type="password" value={userPassword} onChange={ (e) => setUserPassword(e.target.value)}></input>
                    <button type="submit" className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand">Log In</button>
                </form>
                <button onClick={() => handleLoginMode("signup")} className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand">Create An Account</button>
            </div>

            
            )}
        </div>

    )
}