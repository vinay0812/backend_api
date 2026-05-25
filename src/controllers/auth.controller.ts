import {Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
 
import dotenv from "dotenv"
 import process = require("process");
dotenv.config();
const prisma = new PrismaClient()
 
const jwtkey = process.env.JWT_KEY
if (!jwtkey) throw new Error("JWT_KEY not set")

export default async function registerUser(req:Request,res:Response){

    try {
        
        const {name,email,password} = req.body
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        const user = await prisma.user.create({
            data:{
                name,
                email,
                isAdmin :false,
                password:hashedPassword
            }
        })

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({"message":error})
    }


}

async function  login(req:Request,res:Response) {

    try {
        const {email ,password} = req.body;

       const user =  await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return res.status(404).json({"message":"user does not exist"})
        }

        const result = await bcrypt.compare(password,user.password)

        if(!result){
            return res.status(403).json({"message":"wrong credentials"})
        }

        const token = jsonwebtoken.sign(String(user.id),jwtkey)

        return res.json(token)
        
    } catch (error) {
      return res.status(500).json({"message":error})   
    }


    
}

export {login}