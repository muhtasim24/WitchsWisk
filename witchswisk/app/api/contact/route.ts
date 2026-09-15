import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: NextRequest) {
    const { name, email, body } = await request.json();
    try {
        const {data, error} = await resend.emails.send( {
            from: 'onboarding@resend.dev',
            to: 'awitchswhisk@gmail.com',
            subject: "New A Witch Whisk Contact Form Message",
            text: `
                Name: ${name}
                Email: ${email}

                Message: 
                ${body}    
            `
        });

        if(error) {
            return NextResponse.json({ error }, { status: 500});
        }
        return NextResponse.json(data);
    }
    catch (error) {
        return NextResponse.json( { error }, { status: 500 });
    }
}