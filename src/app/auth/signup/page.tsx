"use client"

import { useState } from "react";
import { supabase } from "~/server/utils/supabaseClient";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
        } else {
            alert("Signup successful! Check your email to confirm.");
        }
    };

    return (
        <form onSubmit={handleSignup}>
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
            />
            <button type="submit">Sign Up</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}

export default SignupForm;