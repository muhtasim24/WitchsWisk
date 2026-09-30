import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminOrders() {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect("/");

    const { data, error } = await supabase.from('users').select('*').eq('id', user.id).maybeSingle();

    if (error || !data) {
        console.error(error);
        redirect("/");
    }

    if (!data.is_admin) {
        redirect("/");
    }

    const allOrders = await supabase.from("orders").select("*");
    
    console.log(data);
    return (
        <div>
            <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
            >
                <ArrowLeft size={20} />
                Back to Dashboard
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold font-dancing text-white mb-2">
                Admin Orders
            </h1>
        </div>
    )
}