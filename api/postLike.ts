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
    res.status(400).send({ error: "Bad Request" });
  }
};

export const getPostLikeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postLike = await prisma.postLike.findUnique({
      where: { id: Number(id) },
    });
    res.json(postLike);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const createPostLike = async (req: Request, res: Response) => {
  try {
    const { userId, postId } = req.body;
    const postLike = await prisma.postLike.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });
    res.status(201).json(postLike);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const updatePostLike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, postId } = req.body;
    const postLike = await prisma.postLike.update({
      where: { id: Number(id) },
      data: { userId: userId, postId: postId },
    });
    res.json(postLike);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const deletePostLike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const postLike = await prisma.postLike.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};
