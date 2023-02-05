import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPostComments = async (req: Request, res: Response) => {
  try {
    const postComments = await prisma.postComment.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json(postComments);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getPostCommentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postComment = await prisma.postComment.findUnique({
      where: { id: Number(id) },
    });
    if (!postComment) {
      return res.status(404).send({ error: "PostComment not found" });
    }
    res.json(postComment);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const createPostComment = async (req: Request, res: Response) => {
  const { userId, postId, text } = req.body;
  if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  } else if (!postId) {
    return res.status(400).send({ error: "postId is required" });
  } else if (!text) {
    return res.status(400).send({ error: "text is required" });
  }
  try {
    const postComment = await prisma.postComment.create({
      data: {
        userId: userId,
        postId: postId,
        text: text,
      },
    });
    res.status(201).json(postComment);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updatePostComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, postId, text } = req.body;
  if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  } else if (!postId) {
    return res.status(400).send({ error: "postId is required" });
  } else if (!text) {
    return res.status(400).send({ error: "text is required" });
  }
  try {
    const postComment = await prisma.postComment.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!postComment) {
      return res.status(404).send({ error: "PostComment not found" });
    }
    await prisma.postComment.update({
      where: { id: Number(id) },
      data: {
        userId: userId,
        postId: postId,
        text: text,
      },
    });
    res.json(postComment);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const deletePostComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postComment = await prisma.postComment.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!postComment) {
      return res.status(404).send({ error: "PostComment not found" });
    }
    await prisma.postComment.delete({
      where: {
        id: Number(id),
      },
    });
    res.send({ message: "PostComment deleted successfully" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
