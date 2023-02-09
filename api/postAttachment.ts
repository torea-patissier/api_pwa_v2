import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPostAttachments = async (req: Request, res: Response) => {
  try {
    const postAttachments = await prisma.postAttachment.findMany({
    });
    res.json(postAttachments);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getPostAttachmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postAttachment = await prisma.postAttachment.findUnique({
      where: { id: Number(id) },
    });
    if (!postAttachment) {
      return res.status(404).send({ error: "PostAttachment not found" });
    }
    res.json(postAttachment);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const createPostAttachment = async (req: Request, res: Response) => {
  const { type, s3Key, postId } = req.body;
  if (!type) {
    return res.status(400).send({ error: "type is required" });
  } else if (!s3Key) {
    return res.status(400).send({ error: "s3Key is required" });
  } else if (!postId) {
    return res.status(400).send({ error: "postId is required" });
  }
  try {
    const postAttachment = await prisma.postAttachment.create({
      data: {
        type: type,
        s3Key: s3Key,
        postId: postId,
      },
    });
    res.status(201).json(postAttachment);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updatePostAttachment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, s3Key, postId } = req.body;
  if (!type) {
    return res.status(400).send({ error: "type is required" });
  } else if (!s3Key) {
    return res.status(400).send({ error: "s3Key is required" });
  } else if (!postId) {
    return res.status(400).send({ error: "postId is required" });
  }
  try {
    const postAttachment = await prisma.postAttachment.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!postAttachment) {
      return res.status(404).send({ error: "PostAttachment not found" });
    }
    const newPostAttachment = await prisma.postAttachment.update({
      where: { id: Number(id) },
      data: {
        type: type,
        s3Key: s3Key,
        postId: postId,
      },
    });
    res.json(newPostAttachment);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const deletePostAttachment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postAttachment = await prisma.postAttachment.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!postAttachment) {
      return res.status(404).send({ error: "PostAttachment not found" });
    }
    await prisma.postAttachment.delete({
      where: {
        id: Number(id),
      },
    });
    res.send({ message: "PostAttachment deleted successfully" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
