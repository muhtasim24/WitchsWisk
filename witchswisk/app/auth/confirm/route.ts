import { type EmailOtpType } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { NextResponse, type NextRequest } from 'next/server'

import { createServerSupabase } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? '/'

    if (token_hash && type) {
        const supabase = await createServerSupabase();

        const { data, error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
        })
    
        if (!error && data.user) {

            if (type === "email") {
                const admin = supabaseAdmin;

                const { data: existing } = await admin
                    .from('users')
                    .select('id')
                    .eq('id', data.user.id)
                    .maybeSingle()

                if (!existing) {
                    const {first_name, last_name} = data.user.user_metadata;
                    const fullName = `${first_name ?? ''} ${last_name ?? ''}`.trim();

                    await admin
                    .from("users")
                    .insert( {id: data.user.id, name: fullName, email: data.user.email! })
                    .select()
                }
                // redirect user to specified redirect URL or root of app
            }
        }
    }
  // redirect the user
  return NextResponse.redirect(new URL(next, request.url));
}