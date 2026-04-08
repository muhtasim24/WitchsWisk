'use client';

import { useEffect, useState } from "react";

export default function Login() {
    const [items, setItems] = useState([])
    const [newItem, setNewItem] = useState("");

    // Fetch exisiting items, make a GET request to the api endpoint
    useEffect( () => {
        // make the fetch reques to the api endpoint
        fetch("/api/hello", {method: "GET"})
            .then( (response) => response.json()) // take the response and turn it into JS readable
            .then( (data) => setItems(data.items))
            .catch( (err) => console.error(err));
    }, []); // need the empty [] so only renders on first initial render

    async function addItem() {
        if (!newItem) return;

        const res = await fetch("/api/hello", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( {name : newItem}) // turn the data into JSON to send to the server
        });

        const data = await res.json();
        console.log("POST response:", data)

        // fetch updated list after POST
        const updated = await fetch("/api/hello").then( (response) => response.json()); // get the response 
        setItems(updated.items);

        setNewItem("");
    }

    return (
        <div>
            <h1>MINI ITEMS</h1>

            <input 
                value = {newItem}
                onChange = { (e) => setNewItem(e.target.value)}
                placeholder = "ENTER ITEM"
            />
            <button onClick = {addItem}>ADD ITEM</button>

            <ul>
                {items.map((item, i) => (
                    <li key={i}>{item.name}</li>
                ))}
            </ul>
        </div>
    )

}