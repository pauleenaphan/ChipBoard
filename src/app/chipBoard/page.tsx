//! HOMEPAGE FOR ALL CHIP BOARDS 
"use client"

import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { BsPencilSquare } from "react-icons/bs";

import { Loading } from "../_components/Loading";

import { useCreateBoard } from "../utils/boardAPI";
import { supabase } from "~/server/utils/supabaseClient";

import Modal from "../_components/Modal";

const AllChipBoards = () => {
    const router = useRouter();
    const { createBoard } = useCreateBoard();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const [newFormVisible, setNewFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        chipName: "",
        entry: "",
        rating: "",
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) {
                    console.error("Error checking auth:", error);
                    router.push("/auth/login");
                    return;
                }
                
                if (!session?.access_token) {
                    console.log("No session found, redirecting to login");
                    router.push("/auth/login");
                } else {
                    console.log("Session found, proceeding to load boards");
                    setIsCheckingAuth(false);
                }
            } catch (error) {
                console.error("Error in checkAuth:", error);
                router.push("/auth/login");
            }
        };
        checkAuth();
    }, [router]);

    const { data: allBoards, isLoading, error } = api.board.getAllBoards.useQuery(undefined, {
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        enabled: !isCheckingAuth,
    });

    useEffect(() => {
        if (error?.message?.includes("UNAUTHORIZED")) {
            console.error("Error loading boards:", error);
            setRetryCount(prev => prev + 1);
            if (retryCount >= 2) {
                router.push("/auth/login");
            }
        }
    }, [error, retryCount, router]);

    if (isCheckingAuth || isLoading) return <Loading></Loading>;
    if (error) {
        console.error("Error loading boards:", error);
        if (error.message.includes("UNAUTHORIZED")) {
            return <div>Please log in to view boards</div>;
        }
        return <div>Error loading boards: {error.message}</div>;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const status = await createBoard(formData.chipName, formData.entry, formData.rating);
        if (status === true) {
            setNewFormVisible(false);
            setFormData({ chipName: "", entry: "", rating: "" });
        }
    };

    return(
        <div className="w-[70%] mx-auto">
            <div className="flex justify-between">
                <h1 className="heading"> Your Chip Boards </h1>
                <BsPencilSquare onClick={() =>{ setNewFormVisible(true)}} className="hover:text-gray-700 hover:cursor-pointer text-5xl font-bold"/>
                
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
                {!isLoading && allBoards?.map((board) => (
                    <div
                    key={board.id}
                    onClick={() => { router.push(`/chipBoard/${board.id}`) }}
                    className="flex flex-col gap-4 border-4 rounded-2xl p-8 hover:bg-yellow-500 hover:cursor-pointer flex-1 min-w-[400px]"
                    >
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">{board.chipName}</h2>
                        <p> Munched on: {board.date} </p>
                        <p className="truncate w-full">{board.entry}</p>
                    </div>
                    <p> Rating: {board.rating} Chips </p>
                    </div>
                ))}
            </div>
            
            <Modal title="New Chip Board" 
                description="Rate the chips you just tried and share your thoughts" 
                isOpen={newFormVisible}
                onClose={() =>{ setNewFormVisible(false) }}
            >
                <form onSubmit={ handleSubmit } className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="font-bold text-left"> Name:  </label>
                        <input 
                            type="text" 
                            placeholder="Name of Chip" 
                            value={formData.chipName} 
                            required={true}
                            onChange={(e) =>
                                setFormData({ ...formData, chipName: e.target.value })
                            }
                            className="border-3 p-3 rounded-xl bg-white outline-none"
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-bold text-left"> Entry: </label>
                        <textarea placeholder="What did you hate/like? How did the crunch make you feel?"
                            required={true}
                            value={formData.entry}
                            onChange={(e) =>
                                setFormData({ ...formData, entry: e.target.value })
                            }
                            className="border-3 p-3 rounded-xl bg-white outline-none h-50"
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-bold text-left"> Rating: </label>
                        <input type="number" min={1} max={10} placeholder="10/10"
                            required={true}
                            value={formData.rating}
                            onChange={(e) =>
                                setFormData({ ...formData, rating: e.target.value }) // + converts val to a number
                            }
                            className="border-3 p-3 rounded-xl bg-white outline-none"
                        />
                    </div>

                    <button type="submit"> Add Board </button>
                </form>
            </Modal>
        </div>
    )
}

// export default expects a value/expression
// const is a declartion not a value so we have to declare it separately 
export default AllChipBoards;