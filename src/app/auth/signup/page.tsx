"use client"

import Link from "next/link";
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

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
        } else {
            alert("Signup successful! Check your email to confirm.");
        }
    };

    return (
        <div className="mx-auto flex flex-col justify-center items-center w-[60%]">
            <div className="text-center mb-5">
                <h1 className="heading"> Welcome to Chipboard! </h1>
                <p className="text-2xl mt-[-30px]"> Ready to start tracking each crunnch? </p>
            </div>
            
            <form onSubmit={handleSignup}
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
                    <div className="flex flex-col">
                        <label className="font-bold"> Confirm Password: </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                            className="p-4 border-3 rounded-xl bg-white focus:outline-none"
                        />
                    </div>
                </div>
                
                <button type="submit" className="ctaBtn w-fit mx-auto">Sign Up</button>
                <p className="mx-auto"> Existing User? <Link href="/auth/login" className="underline font-bold"> Login </Link> </p>
                {error && <p className="text-2xl text-red-800">{error}</p>}
            </form>
        </div>
    );
}

export default SignupForm;