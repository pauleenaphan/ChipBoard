import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "~/server/api/root";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const trpc = createTRPCReact<AppRouter>();

export const getTrpcClient = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
};
