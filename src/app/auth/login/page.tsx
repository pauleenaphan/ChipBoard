"use client"

import Link from "next/link";
import { useState } from "react";
import { supabase } from "~/server/utils/supabaseClient";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                // Wait for the session to be properly set
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.access_token) {
                    console.log("Login successful, session established");
                    router.push("/chipBoard");
                } else {
                    setError("Failed to establish session");
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An error occurred during login");
        }
    };

    return (
        <div className="mx-auto flex flex-col justify-center items-center w-[60%]">
            <div className="text-center mb-5">
                <h1 className="heading"> Welcome Back User! </h1>
                <p className="text-2xl mt-[-30px]"> Ready to rate and munch again? </p>
            </div>

            <form onSubmit={handleLogin}
                className="flex flex-col gap-8 p-10 rounded-2xl border-4 w-[50%] py-20 bg-yellow-500"
            >
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col">
                        <label className="font-bold"> Email: </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="p-4 border-3 rounded-xl bg-white focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold"> Password: </label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="p-4 border-3 rounded-xl bg-white focus:outline-none"
                        />
                    </div>
                </div>
                <button type="submit" className="ctaBtn w-fit mx-auto"> Login </button>
                <p className="mx-auto"> New User? <Link href="/auth/signup" className="underline font-bold"> Create Account </Link> </p>

                {error && <p className="text-blue-900 text-center font-bold">{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;