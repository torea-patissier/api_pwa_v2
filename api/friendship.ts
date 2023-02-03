import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFriendships = async (req: Request, res: Response) => {
  try {
    const friendships = await prisma.friendship.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json(friendships);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const getFriendshipById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const friendship = await prisma.friendship.findUnique({
      where: { id: Number(id) },
    });
    res.json(friendship);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const createFriendship = async (req: Request, res: Response) => {
  try {
    const { status, fromId, toId } = req.body;
    const friendship = await prisma.friendship.create({
      data: {
        status: status,
        fromId: Number(fromId),
        toId: Number(toId),
      },
    });
    res.status(201).json(friendship);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const updateFriendship = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, fromId, toId } = req.body;
    const friendship = await prisma.friendship.update({
      where: { id: Number(id) },
      data: { status: status, fromId: Number(fromId), toId: Number(toId) },
    });
    res.json(friendship);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const deleteFriendship = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const friendship = await prisma.friendship.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};
