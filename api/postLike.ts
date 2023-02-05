import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPostLikes = async (req: Request, res: Response) => {
  try {
    const postLikes = await prisma.postLike.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json(postLikes);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getPostLikeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postLike = await prisma.postLike.findUnique({
      where: { id: Number(id) },
    });
    if (!postLike) {
      return res.status(404).send({ error: "PostLike not found" });
    }
    res.json(postLike);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const createPostLike = async (req: Request, res: Response) => {
  const { userId, postId } = req.body;
  if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  } else if (!postId) {
    return res.status(400).send({ error: "postId is required" });
  }
  try {
    const postLike = await prisma.postLike.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });
    res.status(201).json(postLike);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updatePostLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, postId } = req.body;
  if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  } else if (!postId) {
    return res.status(400).send({ error: "postId is required" });
  }
  try {
    const postLike = await prisma.postLike.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!postLike) {
      return res.status(404).send({ error: "PostLike not found" });
    }
    const newPostLike = await prisma.postLike.update({
      where: { id: Number(id) },
      data: {
        userId: userId,
        postId: postId,
      },
    });
    res.json(newPostLike);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const deletePostLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postLike = await prisma.postLike.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!postLike) {
      return res.status(404).send({ error: "PostLike not found" });
    }
    await prisma.postLike.delete({
      where: {
        id: Number(id),
      },
    });
    res.send({ message: "PostLike deleted successfully" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
