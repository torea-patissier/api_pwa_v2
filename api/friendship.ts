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
    res.status(500).send({ error: error.message });
  }
};

export const getFriendshipById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const friendship = await prisma.friendship.findUnique({
      where: { id: Number(id) },
    });
    if (!friendship) {
      return res.status(404).send({ error: "Friendship not found" });
    }
    res.json(friendship);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getFriendshipsByUserAndStatus = async (
  req: Request,
  res: Response
) => {
  const { userId, status } = req.body;
  if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  }
  if (!status) {
    return res.status(400).send({ error: "status is required" });
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
          status: status,
        },
      },
    });
    res.json(friendships);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getFriendshipsSuggestion = async (req: Request, res: Response) => {
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
      },
    });
    const friendIds = friendships.map((friendship) => {
      if (friendship.fromId === Number(userId)) {
        return friendship.toId;
      }
      return friendship.fromId;
    });
    const users = await prisma.user.findMany({
      where: {
        id: {
          notIn: friendIds,
        },
      },
    });

    res.json(users);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const createFriendship = async (req: Request, res: Response) => {
  const { status, fromId, toId } = req.body;
  if (!status) {
    return res.status(400).send({ error: "status is required" });
  } else if (!fromId) {
    return res.status(400).send({ error: "fromId is required" });
  } else if (!toId) {
    return res.status(400).send({ error: "toId is required" });
  }
  try {
    const friendship = await prisma.friendship.create({
      data: {
        status: status,
        fromId: fromId,
        toId: toId,
      },
    });
    res.status(201).json(friendship);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updateFriendship = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, fromId, toId } = req.body;
  if (!status) {
    return res.status(400).send({ error: "status is required" });
  } else if (!fromId) {
    return res.status(400).send({ error: "fromId is required" });
  } else if (!toId) {
    return res.status(400).send({ error: "toId is required" });
  }
  try {
    const friendship = await prisma.friendship.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!friendship) {
      return res.status(404).send({ error: "Friendship not found" });
    }
    const newFriendship = await prisma.friendship.update({
      where: { id: Number(id) },
      data: { status: status, fromId: fromId, toId: toId },
    });
    res.json(newFriendship);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteFriendship = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const friendship = await prisma.friendship.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!friendship) {
      return res.status(404).send({ error: "Friendship not found" });
    }
    await prisma.friendship.delete({
      where: {
        id: Number(id),
      },
    });
    res.send({ message: "Friendship deleted successfully" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
