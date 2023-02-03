import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPostAttachments = async (req: Request, res: Response) => {
  try {
    const postAttachments = await prisma.postAttachment.findMany({});
    res.json(postAttachments);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const getPostAttachmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postAttachment = await prisma.postAttachment.findUnique({
      where: { id: Number(id) },
    });
    res.json(postAttachment);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const createPostAttachment = async (req: Request, res: Response) => {
  try {
    const { type, s3Key, postId } = req.body;
    const postAttachment = await prisma.postAttachment.create({
      data: {
        type: type,
        s3Key: s3Key,
        postId: postId,
      },
    });
    res.status(201).json(postAttachment);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const updatePostAttachment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, s3Key, postId } = req.body;
    const postAttachment = await prisma.postAttachment.update({
      where: { id: Number(id) },
      data: { type: type, s3Key: s3Key, postId: postId },
    });
    res.json(postAttachment);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const deletePostAttachment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const postAttachment = await prisma.postAttachment.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};
