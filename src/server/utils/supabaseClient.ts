import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "~/server/api/root";
import { httpBatchLink } from "@trpc/client";
import { createClient } from "@supabase/supabase-js";
import superjson from "superjson";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const trpc = createTRPCReact<AppRouter>();

export const getTrpcClient = async () => {
    console.log("GETRTRIFID FUNCTION IS RUNNING");
    const {
        data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;
    console.log("token session?", token);
    return trpc.createClient({
        links: [
        httpBatchLink({
            url: "/api/trpc",
            transformer: superjson,
            headers() {
                console.log("Token in headers()", token);
                return token ? { authorization: `Bearer ${token}` } : {};
            },
        }),
        ],
    });
};
