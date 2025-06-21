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
        <>
            <div className="mx-auto p-10 rounded-2xl border-2 flex flex-col justify-center items-center">
                <h1 className="heading"> Welcome to Chipboard! </h1>
                <p className="text-2xl"> Ready to start tracking each crunnch? </p>
            </div>
            
            <form onSubmit={handleSignup}
                className="flex flex-col gap-4"
            >
                <div>
                    <label> Email: </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="py-4 px-8 rounded-2xl"
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
                        className="py-4 px-8 rounded-2xl"
                    />
                </div>
                <div>
                    <label> Confirm Password: </label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        className="py-4 px-8 rounded-2xl"
                    />
                </div>
                <button type="submit" className="ctaBtn">Sign Up</button>
                {error && <p className="text-2xl text-red-800">{error}</p>}
            </form>
        </>
    );
}

export default SignupForm;