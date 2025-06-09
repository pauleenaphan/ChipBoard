import z from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const boardRouter = createTRPCRouter({
    // creates new chipboard 
    addBoard: publicProcedure
    .input(z.object({
        chipName: z.string().min(1),
        entry: z.string().min(1),
        date: z.string(),
        img: z.string().url().optional(),
        rating: z.number().min(1).max(10)
    }))
    .mutation(async({ ctx, input }) =>{
        return ctx.db.board.create({
            data: {
                ...input
            }
        })
    }),

    // gets single chip board 
    getBoard: publicProcedure.query(async ({ ctx, input }) =>{
        const board = await ctx.db.board.findUnique({
            where: { id: input }
        })

        return board ?? null;
    }),
        
    // get all boards 
    getAllBoards: publicProcedure.query(async ({ ctx }) =>{
        const allBoards = await ctx.db.board.findMany();

        return allBoards;
    }),

    // edits a board 
    editBoard: publicProcedure
    .input(z.object({
        id: z.number(),
        chipName: z.string().min(1),
        entry: z.string().min(1),
        rating: z.number().min(1).max(5)
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