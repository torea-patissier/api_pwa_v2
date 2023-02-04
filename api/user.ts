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
    res.status(500).send({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { firstname, lastname, email } = req.body;
  if (!firstname) {
    return res.status(400).send({ error: "firstname is required" });
  } else if (!lastname) {
    return res.status(400).send({ error: "lastname is required" });
  } else if (!email) {
    return res.status(400).send({ error: "email is required" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
      },
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;
  if (!firstname) {
    return res.status(400).send({ error: "firstname is required" });
  } else if (!lastname) {
    return res.status(400).send({ error: "lastname is required" });
  } else if (!email) {
    return res.status(400).send({ error: "email is required" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    await prisma.user.update({
      where: { id: Number(id) },
      data: { firstname: firstname, lastname: lastname, email: email },
    });
    res.json(user);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.send({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
