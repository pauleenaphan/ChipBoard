import z from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const boardRouter = createTRPCRouter({
    // creates new chipboard 
    addBoard: protectedProcedure
    .input(z.object({
        chipName: z.string().min(1),
        entry: z.string().min(1),
        date: z.string(),
        img: z.string().url().optional(),
        rating: z.number().min(1).max(10)
    }))
    .mutation(async({ ctx, input }) =>{
        if (!ctx.user) {
            throw new Error("Not authenticated");
        }
        return ctx.db.board.create({
            data: {
                ...input,
                userId: ctx.user.id
            }
        })
    }),

    // gets single chip board 
    getBoard: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
            const board = await ctx.db.board.findUnique({
            where: { id: input }
        });
        return board ?? null;
    }),
        
    // get all boards 
    getAllBoards: protectedProcedure.query(async ({ ctx }) =>{
        if(!ctx.user){
            console.log("User is not logged in");
            throw new Error("User is not logged in");
        }
        const allBoards = await ctx.db.board.findMany({
            where: { userId: ctx.user.id }
        });

        return allBoards;
    }),

    // edits a board 
    editBoard: publicProcedure
    .input(z.object({
        id: z.number(),
        chipName: z.string().min(1),
        entry: z.string().min(1),
        rating: z.number().min(1).max(10)
    }))
    .mutation(async ({ ctx, input }) =>{
        return ctx.db.board.update({
            where: { id: input.id },
            data: {
                chipName: input.chipName,
                entry: input.entry,
                rating: input.rating
            }
        })
    }),

    // deletes a board 
    deleteBoard: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) =>{
        return ctx.db.board.delete({
            where: { id: input }
        })
    })
    
})