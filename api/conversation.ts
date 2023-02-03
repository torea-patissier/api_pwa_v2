import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getConversations = async (req: Request, res: Response) => {
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json(conversations);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const getConversationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: Number(id) },
    });
    res.json(conversation);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { fromId, toId } = req.body;
    const conversation = await prisma.conversation.create({
      data: {
        fromId: fromId,
        toId: toId,
      },
    });
    res.status(201).json(conversation);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const updateConversation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fromId, toId } = req.body;
    const conversation = await prisma.conversation.update({
      where: { id: Number(id) },
      data: { fromId: fromId, toId: toId },
    });
    res.json(conversation);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const conversation = await prisma.conversation.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};
