import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile=mutation({
    args:{
        fileName:v.string(),
        teamId:v.string(),
        createdBy:v.string(),
        archive:v.boolean(),
        document:v.string(),
        whiteBoard:v.string()
    },
    handler:async(ctx, args) =>{
        const result = await ctx.db.insert('files',args);
    return result;
    },
})


export const getFiles = query({
    args:{
        teamId:v.string(),
    },handler(ctx, args) {
        const result = ctx.db.query('files').filter(q=>q.eq(q.field('teamId'),args.teamId)
        ).order('desc').collect();

        return result;
    },
})

export const updateDocument=mutation({
    args:{
        _id:v.id("files"),
        document:v.string()
    },
    handler:async(ctx, args) =>{
        const result = await ctx.db.patch(args._id,{document:args.document});
    return result;
    },
})

export const updateWhiteBoard=mutation({
    args:{
        _id:v.id("files"),
        whiteBoard:v.string()
    },handler:async(ctx, args) =>{
        const result = await ctx.db.patch(args._id,{whiteBoard:args.whiteBoard});   
        return result;
    }
})

export const getFilebyId = query({
    args:{
        _id:v.id("files"),
    },handler(ctx, args) {
        const result = ctx.db.get(args._id);
        return result;
    },
})

