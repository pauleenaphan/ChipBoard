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
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login to ChipBoard</h2>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    Login
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;