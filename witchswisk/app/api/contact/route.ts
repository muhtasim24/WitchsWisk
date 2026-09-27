import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
    const { name, email, body } = await request.json();

    if (!name || !email || !body) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeBody = escapeHtml(body);

    try {
        const { data, error } = await resend.emails.send({
            from: 'contact@awitchswhisk.com',
            to: 'awitchswhisk@gmail.com',
            replyTo: email,
            subject: `New Message from ${name} — A Witch's Whisk`,
            html: `
                <div style="background-color: #BC86CE; padding: 30px;">

                <div style="font-family: sans-serif; text-align: center; max-width: 500px; margin: 0 auto; background: white; padding: 25px; border-radius: 10px;">

                    <img 
                    src="https://awitchswhisk.com/logo.png"
                    alt="A Witch's Whisk"
                    style="width: 120px; margin-bottom: 16px;"
                    />

                    <h2 style="margin-bottom: 10px;">
                    New Contact Form Submission
                    </h2>

                    <p style="margin-bottom: 20px; color: #444;">
                    Someone reached out through the site. Details below.
                    </p>

                    <div style="text-align: left; background: #f7f5f2; border-radius: 6px; padding: 16px 18px; margin-bottom: 10px;">
                    <p style="margin: 0 0 8px 0; color: #333;"><strong>Name:</strong> ${safeName}</p>
                    <p style="margin: 0 0 8px 0; color: #333;"><strong>Email:</strong> ${safeEmail}</p>
                    <p style="margin: 12px 0 4px 0; color: #333;"><strong>Message:</strong></p>
                    <p style="margin: 0; color: #333; white-space: pre-wrap; line-height: 1.5;">${safeBody}</p>
                    </div>

                    <a href="mailto:${safeEmail}" 
                    style="display: inline-block; margin-top: 10px; padding: 12px 18px; background-color: #683cc1; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
                    Reply to ${safeName}
                    </a>

                    <p style="margin-top: 25px; font-size: 12px; color: gray;">
                    Sent from the contact form at A Witch's Whisk.
                    </p>

                </div>

                </div>
            `,
        });

        if (error) {
            console.log(error);
            return NextResponse.json({ error }, { status: 500 });
        }
        return NextResponse.json(data);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}