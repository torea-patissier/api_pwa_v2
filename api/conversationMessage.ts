import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getConversationMessages = async (req: Request, res: Response) => {
  try {
    const conversationMessages = await prisma.conversationMessage.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json(conversationMessages);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const getConversationMessageById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const conversationMessage = await prisma.conversationMessage.findUnique({
      where: { id: Number(id) },
    });
    res.json(conversationMessage);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const createConversationMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const { conversationId, userId, content } = req.body;
    const conversationMessage = await prisma.conversationMessage.create({
      data: {
        conversationId: conversationId,
        userId: userId,
        content: content,
      },
    });
    res.status(201).json(conversationMessage);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const updateConversationMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { conversationId, userId, content } = req.body;
    const conversationMessage = await prisma.conversationMessage.update({
      where: { id: Number(id) },
      data: {
        conversationId: conversationId,
        userId: userId,
        content: content,
      },
    });
    res.json(conversationMessage);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const deleteConversationMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const conversationMessage = await prisma.conversationMessage.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};
