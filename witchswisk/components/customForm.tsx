'use client';

import { useState } from "react";


export default function CustomForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    function handleSubmit() {
        setName("");
        setEmail("");
        setBody("")
    }

    return (
        <div className="w-full max-w-3xl flex justify-center items-center flex-col p-6">
            <h1 className="text-3xl font-bold">SPECIAL INQUIRY</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

                {/* Left Side */}
                <div className="flex flex-col gap-6">
    
                    <div>
                        <label>Name:</label>
                        <input
                            className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
    
                    <div>
                        <label>Email:</label>
                        <input
                            className="w-full bg-purple-400 rounded-md h-8 text-black border border-black px-2"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
    
                </div>
    
    
                {/* Right Side */}
                <div className="flex flex-col">
                    <label>Message:</label>
                    <textarea
                        className="w-full h-48 bg-purple-400 rounded-md text-black border border-black px-2 py-2 resize-none"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
    
    
                {/* Button */}
                <div className="col-span-2 flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand"
                    >
                        Submit
                    </button>
                </div>
    
            </form>
        </div>
    )
}