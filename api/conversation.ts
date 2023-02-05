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
    res.status(500).send({ error: error.message });
  }
};

export const getConversationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: Number(id) },
    });
    if (!conversation) {
      return res.status(404).send({ error: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const createConversation = async (req: Request, res: Response) => {
  const { fromId, toId } = req.body;
  if (!fromId) {
    return res.status(400).send({ error: "fromId is required" });
  } else if (!toId) {
    return res.status(400).send({ error: "toId is required" });
  }
  try {
    const conversation = await prisma.conversation.create({
      data: {
        fromId: fromId,
        toId: toId,
      },
    });
    res.status(201).json(conversation);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updateConversation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fromId, toId } = req.body;
  if (!fromId) {
    return res.status(400).send({ error: "fromId is required" });
  } else if (!toId) {
    return res.status(400).send({ error: "toId is required" });
  }
  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!conversation) {
      return res.status(404).send({ error: "Conversation not found" });
    }
    const newConversation = await prisma.conversation.update({
      where: { id: Number(id) },
      data: { fromId: fromId, toId: toId },
    });
    res.json(newConversation);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!conversation) {
      return res.status(404).send({ error: "Conversation not found" });
    }
    await prisma.conversation.delete({
      where: {
        id: Number(id),
      },
    });
    res.send({ message: "Conversation deleted successfully" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
