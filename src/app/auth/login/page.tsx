"use client"

import { useState } from "react";
import { supabase } from "~/server/utils/supabaseClient";
import { getTrpcClient } from "~/server/utils/supabaseClient";

const LoginForm = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if(error){
            setError(error.message);
        }else{
            // logged in successfully
            alert("Logged in!");
            const client = await getTrpcClient();
            console.log("TRPC client ready");
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </>
    );
}

export default LoginForm;