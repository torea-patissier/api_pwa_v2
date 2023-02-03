import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json(users);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    res.json(user);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email } = req.body;
    const user = await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
      },
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { firstname: firstname, lastname: lastname, email: email },
    });
    res.json(user);
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).send({ error: "Bad Request" });
  }
};
