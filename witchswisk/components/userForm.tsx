'use client'

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UserForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
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
        </div>

    )
}