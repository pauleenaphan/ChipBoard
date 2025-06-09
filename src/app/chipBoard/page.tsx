//! HOMEPAGE FOR ALL CHIP BOARDS 
"use client"

import { api } from "~/trpc/react";
import { useState } from "react";

import { useCreateBoard } from "../utils/boardAPI";

const AllChipBoards = () => {
    const { createBoard } = useCreateBoard();
    const { data: allBoards, isLoading } = api.board.getAllBoards.useQuery();

    const [formData, setFormData] = useState({
        chipName: "",
        entry: "",
        rating: "",
    });

    if (isLoading) return <div>Loading...</div>;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        try{
            const status = await createBoard(formData.chipName, formData.entry, formData.rating);
            if(status == true){ setFormData({ chipName: "", entry: "", rating: "" }); }
        }catch(error){
            console.error("Error creating new Board", error);
        }
    }

    return(
        <div>
            <div> all chips boards here </div>
            <form onSubmit={ handleSubmit }>
                <div> new board </div>
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
                        setFormData({ ...formData, rating: e.target.value }) // + converts val to a number
                    }
                />

                <button type="submit"> Add Board </button>
            </form>
        </div>
        
    )
}

// export default expects a value/expression
// const is a declartion not a value so we have to declare it separately 
export default AllChipBoards;