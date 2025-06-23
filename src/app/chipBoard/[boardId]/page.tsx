"use client"
import Link from "next/link";

import { api } from "~/trpc/react";
import { useParams, useRouter } from 'next/navigation';
import { useState } from "react";

import { useDeleteBoard, useEditBoard } from "~/app/utils/boardAPI";
import { Loading } from "~/app/_components/Loading";

import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";

import Modal from "~/app/_components/Modal";


const ChipBoard = () =>{
    const router = useRouter();
    const params = useParams();
    const boardId = Number(params.boardId);
    const { removeBoard } = useDeleteBoard();
    const { editBoard } = useEditBoard();
    const { data: chipBoard, isLoading } = api.board.getBoard.useQuery(boardId);
    const [editFormVisible, setEditFormVisible] = useState(false);

    const [formData, setFormData] = useState({
        chipName: chipBoard?.chipName,
        entry: chipBoard?.entry,
        rating: chipBoard?.rating,
    });

    const handleDeleteBoard = async (id: number) =>{
        const status = await removeBoard(id);
        if(status == true){ router.push("/chipBoard"); }
    }

    const handleEditForm = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(formData.chipName && formData.entry){
            // backend checks for validation
            await editBoard(boardId, formData.chipName, formData.entry, String(formData.rating));
        }else{
            console.log(typeof formData.rating);
        }
    }

    return(
        <>
            {!isLoading && chipBoard &&(
                <section className="w-[70%] mx-auto">
                    <Link href="/chipBoard">
                        <div className="flex items-center gap-2 mb-10 text-gray-700 hover:text-black hover:cursor-pointer"><FaArrowLeft></FaArrowLeft> Back to Boards </div>
                    </Link>
                    <div className="flex flex-col gap-4 ">
                        <div className="flex flex-col gap-2"> 
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="font-bold text-4xl">{chipBoard.chipName}</h1>
                                    <p className="italic"> Munched on: {chipBoard.date} </p>
                                </div>
                                <div className="flex gap-2 text-4xl">
                                    <FaPencil onClick={() =>{ setEditFormVisible(true)}} className="hover:text-gray-700 hover:cursor-pointer"></FaPencil>
                                    <FaRegTrashCan onClick={() =>{ handleDeleteBoard(boardId)}} className="hover:text-gray-700 hover:cursor-pointer"></FaRegTrashCan>
                                </div>
                            </div>
                            
                            <p className="text-xl border-3 rounded-xl p-4 h-100"> {chipBoard.entry} </p>
                        </div>
                        <p> Rating: {chipBoard.rating} </p>
                    </div>
                </section>
            )}
            
            {isLoading && <Loading></Loading>}
            <Modal
                title="Edit Board"
                description="Did another piece change your mind?"
                isOpen={editFormVisible}
                onClose={() =>{ setEditFormVisible(false)}}
            >
                <form onSubmit={ handleEditForm } className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="font-bold text-left "> Chip: </label>
                        <input type="text" placeholder="Name of Chip" value={formData.chipName} required={true}
                            onChange={(e) =>
                                setFormData({ ...formData, chipName: e.target.value })
                            }
                            className="border-3 p-3 rounded-xl bg-white"
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
                            className="border-3 p-3 rounded-xl h-50 bg-white"
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-bold text-left"> Rating: </label>
                        <input type="number" min={1} max={10} placeholder="10/10"
                            required={true}
                            value={formData.rating}
                            onChange={(e) =>
                                setFormData({ ...formData, rating: +e.target.value }) // + converts val to a number
                            }
                            className="border-3 p-3 rounded-xl bg-white"
                        />
                    </div>
                    <button type="submit"> Edit Board </button>
                </form>
            </Modal>
        </>
    )
}

export default ChipBoard;