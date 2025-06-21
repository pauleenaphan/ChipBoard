"use client"

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
            const { data, error } = await supabase.auth.signInWithPassword({
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
        <div className="mx-auto p-10 rounded-2xl border-2 flex flex-col justify-center items-center">
            <div>
                <h1 className="heading"> Welcome Back User! </h1>
                <p className="text-2xl"> Ready to rate and munch again? </p>
            </div>

            <form onSubmit={handleLogin}
                className="flex flex-col gap-4"
            >
                <div>
                    <div>
                        <label> Email: </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label> Password: </label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="ctaBtn"> Login </button>
                {error && <p className="text-red-800">{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;