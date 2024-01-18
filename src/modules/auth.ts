import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import * as bcrypt from 'bcrypt'

type User = {
    id: string,
    username: string,
}

declare module 'express-serve-static-core' {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

export function createJWT({ user }: { user: User }): string | undefined { 
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET!
    )

    return token
}

export function authMiddleWare(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401)
        res.json({ message: "Not authorized" })
        return
    }
    const [, token] = bearer.split(" ")
    if (!token) {
        res.status(401)
        res.json({ message: "Not authorized" })
        return
    }
    
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET!) as User
        next()
        return
    } catch (e) {
        console.error(e)
        res.status(401).json({message: "Not authorized"})
        return
    }
}

export function comparePassword(pass: string, usrpass: string): Promise<boolean>{
    return bcrypt.compare(pass, usrpass)
}