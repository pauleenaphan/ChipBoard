import { getFormattedToday } from "../utils/helper";
import { api } from "~/trpc/react";

export const useCreateBoard = () => {
    const { mutateAsync: addBoardMutation, error } = api.board.addBoard.useMutation();

    const createBoard = async (chipName: string, entry: string, rating: string) => {
        try{
            await addBoardMutation({
                chipName,
                entry,
                date: getFormattedToday(),
                rating: Number(rating),
            });
            alert("board has been created");
            return true;
        }catch(error){
            console.error("Error creating new board", error);
            return false;
        }
    };

    return { createBoard, error };
};

export const useEditBoard = () =>{
    const { mutateAsync: editBoardMutation, error } = api.board.editBoard.useMutation();

    const editBoard = async(id: number, chipName: string, entry: string, rating: string) =>{
        try{
            await editBoardMutation({
                id,
                chipName,
                entry,
                rating: Number(rating)
            });
            alert("board has been edited");
            return true;
        }catch(error){
            console.error("Error editing board", error);
            return false;
        }
    }

    return { editBoard, error };
}

export const useDeleteBoard = () =>{
    const { mutateAsync: deleteBoardMutation, error } = api.board.deleteBoard.useMutation();

    const removeBoard = async(boardId: number) =>{
        try{
            await deleteBoardMutation(boardId);
            alert("board has been removed");
            return true;
        }catch(error){
            console.error("Error deleting board", error);
            return false;
        }
    }

    return { removeBoard, error }
}