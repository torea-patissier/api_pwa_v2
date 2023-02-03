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
    res.status(400).send({ error: "Bad Request" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    res.json(post);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { htmlContent, userId } = req.body;
    const post = await prisma.post.create({
      data: {
        htmlContent: htmlContent,
        userId: Number(userId),
      },
    });
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { htmlContent } = req.body;
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { htmlContent: htmlContent },
    });
    res.json(post);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};
