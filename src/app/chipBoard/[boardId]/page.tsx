"use client"

import { api } from "~/trpc/react";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from "react";

import { useDeleteBoard, useEditBoard } from "~/app/utils/boardAPI";


const ChipBoard = () =>{
    const router = useRouter();
    const params = useParams();
    const boardId = Number(params.boardId);
    const { removeBoard } = useDeleteBoard();
    const { editBoard } = useEditBoard();
    const { data: chipBoard, isLoading } = api.board.getBoard.useQuery(boardId);

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
                <>
                    <p> boardId: {boardId} </p>
                    <p> {chipBoard.chipName} </p>
                    <p> {chipBoard.date} </p>
                    <p> {chipBoard.entry} </p>

                    <button onClick={() =>{ /*pops up edit form */}}> Edit Board </button>
                    <button onClick={() =>{ handleDeleteBoard(boardId)}}> Delete Board </button>
                </>
                
            )}
            
            {isLoading && <p>Loading...</p>}
            <form onSubmit={ handleEditForm }>
                <div> EDIT board </div>
                <label> Name:  </label>
                <input type="text" placeholder="Name of Chip" value={formData.chipName} required={true}
                    onChange={(e) =>
                        setFormData({ ...formData, chipName: e.target.value })
                    }
                />

                <label> Entry: </label>
                <textarea placeholder="What did you hate/like? How did the crunch make you feel? "
                    required={true}
                    value={formData.entry}
                    onChange={(e) =>
                        setFormData({ ...formData, entry: e.target.value })
                    }
                />

                <label> Rating: </label>
                <input type="number" min={1} max={10} placeholder="10/10"
                    required={true}
                    value={formData.rating}
                    onChange={(e) =>
                        setFormData({ ...formData, rating: +e.target.value }) // + converts val to a number
                    }
                />

                <button type="submit"> Edit Board </button>
            </form>
        </>
    )
}

export default ChipBoard;