import { Request, Response, NextFunction } from "express";
import z, { ZodError } from "zod";
import { userRegisterSchema } from "../schemas/userSchemas";

export default async function validateRegisterUser(req: Request, res: Response, next: NextFunction) {

    try {

        userRegisterSchema.parse(req.body)
        next()
    } catch (error) {
        if(error instanceof ZodError){
            res.status(400).json({error})
        }
    }
}