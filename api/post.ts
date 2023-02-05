import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json(posts);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.json(post);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getPostsByUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  }
  try {
    const posts = await prisma.post.findMany({
      where: { userId: Number(userId) },
    });
    res.json(posts);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { htmlContent, userId } = req.body;
  if (!htmlContent) {
    return res.status(400).send({ error: "htmlContent is required" });
  } else if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  }
  try {
    const post = await prisma.post.create({
      data: {
        htmlContent: htmlContent,
        userId: userId,
      },
    });
    res.status(201).json(post);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { htmlContent, userId } = req.body;
  if (!htmlContent) {
    return res.status(400).send({ error: "htmlContent is required" });
  } else if (!userId) {
    return res.status(400).send({ error: "userId is required" });
  }
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    const newPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        htmlContent: htmlContent,
        userId: userId,
      },
    });
    res.json(newPost);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    // Delete foreign keys
    await prisma.postLike.deleteMany({
      where: {
        postId: post.id,
      },
    });
    await prisma.postComment.deleteMany({
      where: {
        postId: post.id,
      },
    });
    await prisma.postAttachment.deleteMany({
      where: {
        postId: post.id,
      },
    });

    await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.send({ message: "Post deleted successfully" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
