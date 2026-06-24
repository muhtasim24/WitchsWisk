'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";


export default function UserForm() {
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
            alert('user registered');
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
        <div>
            <button onClick={() => handleLoginMode("signin")}>Sign In</button>
            <br></br>
            <button onClick={() => handleLoginMode("signup")}>Sign Up</button>
    
            {loginMode === "signup" && (
            <form onSubmit={handleSignUp}>
                <h1>First Name:</h1>
                <input className="w-4/5 bg-purple-400 rounded-md ml-5 h-8 text-black border border-black" type="text" value={firstName} onChange={ (e) => setFirstName(e.target.value)}></input>

                <h1>Last Name:</h1>
                <input className="w-4/5 bg-purple-400 rounded-md ml-5 h-8 text-black border border-black" type="text" value={lastName} onChange={ (e) => setLastName(e.target.value)}></input>

                <h1>Email:</h1>
                <input className="w-4/5 bg-purple-400 rounded-md ml-5 h-8 text-black border border-black" type="email" value={userEmail} onChange={ (e) => setUserEmail(e.target.value)}></input>

                <h1>Password:</h1>
                <input className="w-4/5 bg-purple-400 rounded-md ml-5 h-8 text-black border border-black" type="password" value={userPassword} onChange={ (e) => setUserPassword(e.target.value)}></input>
                
                <button type="submit">Submit</button>
            </form>
            )}

            {loginMode === "signin" && (
            <form onSubmit={handleSignIn}>
                <h1>Email:</h1>
                <input className="w-4/5 bg-purple-400 rounded-md ml-5 h-8 text-black border border-black" type="email" value={userEmail} onChange={ (e) => setUserEmail(e.target.value)}></input>

                <h1>Password:</h1>
                <input className="w-4/5 bg-purple-400 rounded-md ml-5 h-8 text-black border border-black" type="password" value={userPassword} onChange={ (e) => setUserPassword(e.target.value)}></input>
            </form>
            )}
        </div>

    )
}