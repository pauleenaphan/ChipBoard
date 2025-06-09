import { getFormattedToday } from "../utils/helper";
import { api } from "~/trpc/react";

export const useCreateBoard = () => {
    const { mutateAsync: addBoard, error } = api.board.addBoard.useMutation();

    const createBoard = async (chipName: string, entry: string, rating: string) => {
        try{
            await addBoard({
                chipName,
                entry,
                date: getFormattedToday(),
                rating: Number(rating),
            });
            return true;
        }catch(err){
            console.error("Error creating new Board", err);
            return false;
        }
    };

    return { createBoard, error };
};