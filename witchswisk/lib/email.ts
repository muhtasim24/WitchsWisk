import { Resend } from "resend";
import { supabaseAdmin } from "./supabase/admin";
import { Order } from "./types";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function sendOrderConfirmation(order: Order) {
    const supabase = supabaseAdmin;

    const { data: orderItems, error } = await supabase
        .from('order_items')
        .select('product_name, quantity')
        .eq('order_id', order.id);

    if (error || !orderItems) {
        throw new Error('Failed to load order items for confirmation email');
    }

    const safeName = escapeHtml(order.name);
    const safeAddress = escapeHtml(order.address);

    const itemsHtml = orderItems.map(item => `
        <tr>
            <td style="padding: 8px 0; color: #333;">${escapeHtml(item.product_name)}</td>
            <td style="padding: 8px 0; color: #333; text-align: right;">x${item.quantity}</td>
        </tr>
    `).join('');

    const { data, error: sendError } = await resend.emails.send({
        from: 'order@awitchswhisk.com',
        to: [order.email, 'awitchswhisk@gmail.com'],
        subject: `Order Confirmed — A Witch's Whisk`,
        html: `
            <div style="background-color: #BC86CE; padding: 30px;">

            <div style="font-family: sans-serif; text-align: center; max-width: 500px; margin: 0 auto; background: white; padding: 25px; border-radius: 10px;">

                <img 
                src="https://awitchswhisk.com/logo.png"
                alt="A Witch's Whisk"
                style="width: 120px; margin-bottom: 16px;"
                />

                <h2 style="margin-bottom: 10px;">
                Thanks for your order, ${safeName}!
                </h2>

                <p style="margin-bottom: 20px; color: #444;">
                Order #${order.id} is confirmed. Here's what you ordered:
                </p>

                <table style="width: 100%; text-align: left; background: #f7f5f2; border-radius: 6px; padding: 16px 18px; margin-bottom: 20px; border-collapse: collapse;">
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style="padding-top: 12px; border-top: 1px solid #ddd; font-weight: 600; color: #333;">Total</td>
                            <td style="padding-top: 12px; border-top: 1px solid #ddd; font-weight: 600; color: #333; text-align: right;">$${order.total_price}.00</td>
                        </tr>
                    </tfoot>
                </table>

                <div style="text-align: left; background: #f7f5f2; border-radius: 6px; padding: 16px 18px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #333;"><strong>Shipping to:</strong></p>
                    <p style="margin: 4px 0 0 0; color: #333;">${safeAddress}</p>
                </div>

                <p style="margin-top: 25px; font-size: 12px; color: gray;">
                Questions about your order? Reply to this email and we'll help you out.
                </p>

            </div>

            </div>
        `,
    });

    if (sendError) {
        throw new Error(`Failed to send confirmation email: ${sendError.message}`);
    }

    return data;
}