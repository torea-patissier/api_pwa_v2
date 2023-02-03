import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json(notifications);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const getNotificationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notification = await prisma.notification.findUnique({
      where: { id: Number(id) },
    });
    res.json(notification);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { read, friendshipId, conversationMessageId } = req.body;
    const notification = await prisma.notification.create({
      data: {
        read: read,
        friendshipId: friendshipId,
        conversationMessageId: conversationMessageId,
      },
    });
    res.status(201).json(notification);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const updateNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { read } = req.body;
    const notification = await prisma.notification.update({
      where: { id: Number(id) },
      data: { read: read },
    });
    res.json(notification);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};
