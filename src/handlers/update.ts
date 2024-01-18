import { Request, Response } from "express";
import prisma from "../db";
import { NotFound } from "../modules/exceptions";

export async function create(req: Request, res: Response){
    try {
        const { title, body } = req.body;
        const product = await prisma.product.findUnique({
            where: {
                id: req.body.productId
            }
        });

        if (!product) {
            // does not belong to user
            return res.status(400).json({ message: 'Product does not belong to user' });
        }

        const updated = await prisma.update.create({
            data: {
                title: title,
                body: body,
                Product: { connect: { id: product.id } }
            }
        });

        res.status(201).json({ data: updated });
    } catch (error) {
        console.error('Error en el controlador create:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export async function getAll(req: Request, res: Response){
    try {
        const { id } = req.user;
        const updates = await prisma.update.findMany({
            where: {
                Product:{
                    belongsToId: id
                }
            }
        });

        res.status(200).json({ data: updates });
    } catch (error) {
        console.error('Error en el controlador getAll:', error);
    }
}

export async function getByID(req: Request, res: Response){
    try {
        const id = req.params.id;
        const update = await prisma.update.findUnique({
            where: {
                id: id
            }
        });

        if (!update) {
            throw new NotFound('Update not found');
        }

        res.status(200).json({ data: update });
    } catch (error) {
        console.error('Error en el controlador getByID:', error);
    }
}

export async function update(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const target = await prisma.update.findUnique({
            where:{
                id: id,
            }
        });

        if(!target){
            throw new NotFound('Update not found, id received: '+ id);
        }

        const updatedUpdate = await prisma.update.update({
            where: {
                id: id,
            },
            data: req.body,
        });

        res.status(200).json({ data: updatedUpdate });
    } catch (error) {
        console.error('Error en el controlador update:', error);
    }
}

export async function remove(req: Request, res: Response){
    try {
        const id = req.params.id;
        const target = await prisma.update.findUnique({
            where:{
                id: id,
            }
        });

        if(!target){
            throw new NotFound('Update not found, id received: '+ id);
        }
        
        const deletedUpdate = await prisma.update.delete({
            where: {
                id: id
            }
        });

        res.status(204).json({data: deletedUpdate}); // No hay contenido para enviar
    } catch (error) {
        console.error('Error en el controlador remove:', error);
    }
}
