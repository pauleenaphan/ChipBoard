"use client"

import { api } from "~/trpc/react";
import { useParams } from 'next/navigation';

const ChipBoard = () =>{
    const params = useParams();
    const boardId = Number(params.boardId);

    const { data: chipBoard, isLoading } = api.board.getBoard.useQuery({ id: boardId });

    return(
        <>
            {!isLoading && chipBoard &&(
                <>
                    <p> boardId: {boardId} </p>
                    <p> {chipBoard.chipName} </p>
                    <p> {chipBoard.date} </p>
                    <p> {chipBoard.entry} </p>
                </>
            )}
            
            {isLoading && <p>Loading...</p>}
        </>
    )
}

export default ChipBoard;