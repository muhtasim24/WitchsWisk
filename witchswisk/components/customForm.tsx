'use client';

import { useState } from "react";

export default function CustomForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        body: "",
    });

    function validate() {
        const newErrors = {
            name: "",
            email: "",
            body: "",
        };

        if (name.trim() === "") {
            newErrors.name = "Name is required";
        }

        const emailParts = email.split("@");
        if (!email.includes("@") || email.trim() === "" || emailParts.length !== 2 || emailParts[0] === "" || emailParts[1] === "") {
            newErrors.email = "Invalid email";
        }

        if (body.trim() === "") {
            newErrors.body = "Message is required";
        } else if (body.trim().length < 10) {
            newErrors.body = "Message must be at least 10 characters";
        }

        return {
            isValid: Object.values(newErrors).every(error => error === ""),
            errors: newErrors,
        };
    }

    const isFormFilled = name.trim() !== "" && email.trim() !== "" && body.trim() !== "";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const valid = validate();
        setErrors(valid.errors);

        if (!valid.isValid) return;
        if (loading) return;

        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {name, email, body} )
            });
            if (!res.ok) {
                throw new Error("Failed to send message");
            }
            setName("");
            setEmail("");
            setBody("");
            setErrors({ name: "", email: "", body: "" });
        } catch(error) {
            console.log("Failed to send message", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full flex justify-center items-center flex-col p-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-dancing mb-4">CONTACT US</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

                {/* Left Side */}
                <div className="flex flex-col gap-6">
    
                    <div>
                        <label>Name:</label>
                        <input
                            className={`w-full text-white bg-input rounded-md h-8 border px-2 ${errors.name ? "border-red-500" : "border-black"}`}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className={`text-red-300 text-sm h-5 ${errors.name ? "visible" : "invisible"}`}>{errors.name || " "}</p>
                    </div>
    
                    <div>
                        <label>Email:</label>
                        <input
                            className={`w-full text-white bg-input rounded-md h-8 border px-2 ${errors.email ? "border-red-500" : "border-black"}`}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className={`text-red-300 text-sm h-5 ${errors.email ? "visible" : "invisible"}`}>{errors.email || " "}</p>
                    </div>
    
                </div>
    
    
                {/* Right Side */}
                <div className="flex flex-col">
                    <label>Message:</label>
                    <textarea
                        className={`w-full h-32 sm:h-full text-sm bg-input text-white rounded-md border px-2 py-2 resize-none ${errors.body ? "border-red-500" : "border-black"}`}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <p className={`text-red-300 text-sm h-5 ${errors.body ? "visible" : "invisible"}`}>{errors.body || " "}</p>
                </div>
    
    
                {/* Button */}
                <div className="col-span-1 sm:col-span-2 flex justify-center">
                    <button
                        type="submit"
                        disabled={loading || !isFormFilled}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 
                        ${loading || !isFormFilled ? "bg-gray-400 cursor-not-allowed" : "bg-white text-brand"}`}
                    >
                        {loading ? "Sending..." : "Submit"}
                    </button>
                </div>
    
            </form>
        </div>
    )
}