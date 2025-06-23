"use client"
import Link from "next/link";
import { supabase } from "~/server/utils/supabaseClient";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

export const Navbar = () =>{
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const getSession = async () => { 
            const { data: { session }, error } = await supabase.auth.getSession();
            setSession(session);
        };
        getSession();
    }, []);

    const handleLogout = async () => {
        const {error} = await supabase.auth.signOut();
        if(error){
            alert("Logout failed: " + error.message);
        }else{
            alert("User has logged out!");
            setSession(null); // so that navbar will show login/signup
        }
    };

    return(
        <nav className="flex bg-stone-900 justify-between items-center w-[70%] p-4 px-8 text-white mx-auto mt-6 mb-30 rounded-xl">
            <h1 className="text-4xl text-yellow-500"
            style={{ fontFamily: "'Luckiest Guy', cursive" }}
            > CHIPBOARD </h1>
            <div className="flex gap-4 font-bold ">
                <Link href="/" className="hover:text-gray-300"> Home </Link>
                <Link href="/about" className="hover:text-gray-300"> About </Link>
                <Link href="/browse" className="hover:text-gray-300"> Browse </Link>
                {/* /chipBoard will check and redirect user if not logged in */}
                <Link href="/chipBoard" className="hover:text-gray-300"> Board </Link>
            </div>
            <div className="flex gap-4 items-center font-bold">
                {session?.access_token ? (
                    <button 
                        onClick={() => { handleLogout() }}
                        className="ctaBtn"
                        > Logout </button>
                ):(
                    <>
                        <Link href="/auth/login" className="hover:text-gray-300"> Login </Link>
                        <Link href="/auth/signup"
                            className="ctaBtn"
                        > Sign Up </Link>
                    </>
                )}
            </div>
        </nav>
    )
}