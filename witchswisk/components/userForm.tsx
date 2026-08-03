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
    const [errors, setErrors] = useState( {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

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

    function validateSignUp() {
        const errors = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
        const emailParts = userEmail.split("@");
        if (!userEmail.includes("@") || userEmail.trim() === "" || emailParts.length !== 2 || emailParts[0] === "" || emailParts[1] === "") {
            errors.email = "Invalid email";
        }
        if (userPassword.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        if (firstName.trim() === "") {
            errors.firstName = "First name is required"
        }
        if (lastName.trim() === "") {
            errors.lastName = "Last name is required"
        }
        
        return {
            isValid: Object.values(errors).every(error => error === ""),
            errors
        };
    }

    async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const valid = validateSignUp();
        setErrors(valid.errors);

        if (!valid) {
            return console.log("Invalid sign up");
        }

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
        const name: string = firstName + " " + lastName
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
        return;
    }
    
    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
            {loginMode === "signup" && (
            <div className="flex flex-col gap-6">
                <h1 className="text-lg font-bold flex items-center justify-center">CREATE AN ACCOUNT</h1>
                <form onSubmit={handleSignUp}>
                    <label>First Name:</label>
                    <input className={`w-full bg-purple-400 rounded-md h-8 text-black border px-2 ${errors.firstName ? "border-red-500" : "border-black"}`} type="text" value={firstName} onChange={ (e) => setFirstName(e.target.value)}></input>
                    {errors.firstName && (
                        <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}

                    <label>Last Name:</label>
                    <input className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="text" value={lastName} onChange={ (e) => setLastName(e.target.value)}></input>
                    {errors.lastName && (
                        <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}

                    <label>Email:</label>
                    <input className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="email" value={userEmail} onChange={ (e) => setUserEmail(e.target.value)}></input>
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}


                    <label>Password:</label>
                    <input className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2" type="password" value={userPassword} onChange={ (e) => setUserPassword(e.target.value)}></input>
                    {errors.password && (
                        <p className = "text-red-500 text-sm">{errors.password}</p>
                    )}


                    <button type="submit" className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand items-center">Sign Up</button>
                </form>
                <button onClick={() => handleLoginMode("signin")} className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand">Log In</button>
            </div>
            )}

            {loginMode === "signin" && (
            <div className="flex flex-col gap-6">
                <h1 className="text-lg font-bold flex items-center justify-center">LOGIN TO YOUR ACCOUNT</h1>
                <form onSubmit={handleSignIn}>
                    <label>Email:</label>
                    <input className="w-full bg-purple-400 rounded-md  h-8 text-black border border-black px-2" type="email" value={userEmail} onChange={ (e) => setUserEmail(e.target.value)}></input>

                    <label>Password:</label>
                    <input className="w-full bg-purple-400 rounded-md  h-8 text-black border border-black px-2" type="password" value={userPassword} onChange={ (e) => setUserPassword(e.target.value)}></input>
                    <button type="submit" className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand">Log In</button>
                </form>
                <button onClick={() => handleLoginMode("signup")} className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand">Create An Account</button>
            </div>

            
            )}
        </div>

    )
}