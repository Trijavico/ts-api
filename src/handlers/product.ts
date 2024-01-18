import { Request, Response } from "express"
import prisma from "../db";
import { NotFound } from "../modules/exceptions";

export async function create(req: Request, res: Response){
    try {
        const { name } = req.body;
        const product = await prisma.product.create({
            data:{
                name: name,
                belongsToId: req.user.id
            }
        });
        res.status(200).json({data: product});
    } catch (error) {
        console.error('Error in create controller product:', error);
    }
}

export async function getAll(req: Request, res: Response){
    try {
        const { user } = req;
        const usr = await prisma.user.findUnique({
            where:{
                id: user.id
            },
            include: {
                Product: true
            }
        });
        res.status(200).json({data: usr?.Product});
    } catch (error) {
        console.error('Error in getAll controller product:', error);
    }
}

export async function getByID(req: Request, res: Response){
    try {
        const id = req.params.id;
        const { user } = req;
        const product = await prisma.product.findFirst({
            where: {
                id: id,
                belongsToId: user.id
            }
        });

        if(!product){
            throw new NotFound('Update not found, id received: '+ id);
        }
        
        res.status(200).json({data: product});
    } catch (error) {
        console.error('Error in getByID controller product:', error);
    }
}

export async function update(req: Request, res: Response) {
    try {
        const { user } = req;
        const target = await prisma.update.findUnique({
            where:{
                id: user.id,
            }
        });

        if(!target){
            throw new NotFound('Update not found, id received: '+ user.id);
        }

        const product = await prisma.product.update({
            where: {
                id: req.params.id,
                belongsToId: user.id
            },
            data:{
                name: req.body.name
            }
        });

        res.status(200).json({ message: 'Updated product successfully', data: product });
    } catch (error) {
        console.error('Error in update controller product:', error);
    }
}

export async function remove(req: Request, res: Response){
    try {
        const { user } = req;
        const target = await prisma.update.findUnique({
            where:{
                id: user.id,
            }
        });

        if(!target){
            throw new NotFound('Update not found, id received: '+ user.id);
        }

        const product = await prisma.product.delete({
            where: {
                id: req.params.id,
                belongsToId: user.id
            }
        });

        res.status(200).send({message: 'Removed product successfully', data: product});
    } catch (error) {
        console.error('Error in remove controller product:', error);
    }
}
