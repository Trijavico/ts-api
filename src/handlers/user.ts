import { Request, Response } from "express"
import prisma from "../db"
import { comparePassword, createJWT } from "../modules/auth"
import * as bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
    const { username, password } = req.body
    const hashPwd = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            username: username,
            password: hashPwd
        }
    })

    const token = createJWT({user: user})
    if(!token){
        res.status(500).json({message: "An error occurred"})
        return;
    }
    res.status(200).json({token})
}

export async function signIn(req: Request, res: Response) {
    const { username, password } = req.body
    const user = await prisma.user.findUnique({
        where:{
            username: username
        }
    })
    if(!user){
        res.status(401).json({messsage:"Invalid user"})
        return;
    }
    const isValid = await comparePassword(password, user.password)
    if(!isValid){
        res.status(401).json({message: "Invalid user"})
        return;
    }
    const token = createJWT({user: user})
    if(!token){
        res.status(500).json({message: "An error occurred"})
        return;
    }
    res.status(200).json({token})
}