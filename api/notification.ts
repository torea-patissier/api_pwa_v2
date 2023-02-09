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
    res.status(500).send({ error: error.message });
  }
};

export const getNotificationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notification = await prisma.notification.findUnique({
      where: { id: Number(id) },
    });
    if (!notification) {
      return res.status(404).send({ error: "Notification not found" });
    }
    res.json(notification);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getNotificationsByUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  }
  try {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          {
            fromId: Number(userId),
          },
          { toId: Number(userId) },
        ],
        AND: {
          status: "PENDING",
        },
      },
    });
    const friendIds = friendships.map((friendship) => {
      return friendship.id;
    });
    const notifications = await prisma.notification.findMany({
      where: {
        friendshipId: {
          in: friendIds,
        },
      },
    });
    res.json(notifications);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const createNotification = async (req: Request, res: Response) => {
  const { read, friendshipId, conversationMessageId } = req.body;
  if (!read) {
    return res.status(400).send({ error: "read is required" });
  } else if (!friendshipId) {
    return res.status(400).send({ error: "friendshipId is required" });
  }
  try {
    const notification = await prisma.notification.create({
      data: {
        read: read,
        friendshipId: friendshipId,
        conversationMessageId: conversationMessageId,
      },
    });
    res.status(201).json(notification);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updateNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { read, friendshipId, conversationMessageId } = req.body;
  if (!read) {
    return res.status(400).send({ error: "read is required" });
  } else if (!friendshipId) {
    return res.status(400).send({ error: "friendshipId is required" });
  }
  try {
    const notification = await prisma.notification.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!notification) {
      return res.status(404).send({ error: "Notification not found" });
    }
    const newNotification = await prisma.notification.update({
      where: { id: Number(id) },
      data: {
        read: read,
        friendshipId: friendshipId,
        conversationMessageId: conversationMessageId,
      },
    });
    res.json(newNotification);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notification = await prisma.notification.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!notification) {
      return res.status(404).send({ error: "Notification not found" });
    }
    await prisma.notification.delete({
      where: {
        id: Number(id),
      },
    });
    res.send({ message: "Notification deleted successfully" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
