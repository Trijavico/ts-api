import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "./exceptions";

export function errorValidation(req: Request, res: Response, next: NextFunction){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res
        .status(400)
        .json({errors: errors.array()})
        return
    }
    next()
}

export function errorHandler(err: ApiError, req: Request, res: Response, next: NextFunction){
    const error = err;
    return res.status(error.code ?? 500).send({message: error.message});
}