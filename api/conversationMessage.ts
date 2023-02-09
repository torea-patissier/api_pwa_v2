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
    res.status(500).send({ error: error.message });
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
    if (!conversationMessage) {
      return res.status(404).send({ error: "ConversationMessage not found" });
    }
    res.json(conversationMessage);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getConversationMessagesByConversationId = async (
  req: Request,
  res: Response
) => {
  const { conversationId } = req.body;
  if (!conversationId) {
    return res.status(404).send({ error: "conversationId is required" });
  }
  try {
    const conversationMessage = await prisma.conversationMessage.findMany({
      where: { conversationId: Number(conversationId) },
    });

    res.json(conversationMessage);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const createConversationMessage = async (
  req: Request,
  res: Response
) => {
  const { conversationId, userId, content } = req.body;
  if (!conversationId) {
    return res.status(400).send({ error: "conversationId is required" });
  } else if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  } else if (!content) {
    return res.status(400).send({ error: "content is required" });
  }
  try {
    const conversationMessage = await prisma.conversationMessage.create({
      data: {
        conversationId: conversationId,
        userId: userId,
        content: content,
      },
    });
    res.status(201).json(conversationMessage);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updateConversationMessage = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { conversationId, userId, content } = req.body;
  if (!conversationId) {
    return res.status(400).send({ error: "conversationId is required" });
  } else if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  } else if (!content) {
    return res.status(400).send({ error: "content is required" });
  }
  try {
    const conversationMessage = await prisma.conversationMessage.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!conversationMessage) {
      return res.status(404).send({ error: "ConversationMessage not found" });
    }
    const newConversationMessage = await prisma.conversationMessage.update({
      where: { id: Number(id) },
      data: {
        conversationId: conversationId,
        userId: userId,
        content: content,
      },
    });
    res.json(newConversationMessage);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteConversationMessage = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const conversationMessage = await prisma.conversationMessage.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!conversationMessage) {
      return res.status(404).send({ error: "ConversationMessage not found" });
    }
    await prisma.conversationMessage.delete({
      where: {
        id: Number(id),
      },
    });
    res.send({ message: "ConversationMessage deleted successfully" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
