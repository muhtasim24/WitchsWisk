
let items = []

export async function GET(req) {
    return new Response(JSON.stringify({ items }), {
        status: 200,
        headers: {"Content-Type": "application/json"},
    });
}


export async function POST(req) {
    const body = await req.json(); // take in the request, turn the JSON data into readable JS?
    items.push(body)
    return new Response(JSON.stringify( {item:body}), {
        status:200,
        headers: {"Content-Type": "application/json"},
    });

}