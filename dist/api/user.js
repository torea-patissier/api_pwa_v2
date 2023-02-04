"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email } = req.body;
    if (!firstname) {
        return res.status(400).send({ error: "firstname is required" });
    }
    else if (!lastname) {
        return res.status(400).send({ error: "lastname is required" });
    }
    else if (!email) {
        return res.status(400).send({ error: "email is required" });
    }
    try {
        const user = yield prisma.user.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;
    if (!firstname) {
        return res.status(400).send({ error: "firstname is required" });
    }
    else if (!lastname) {
        return res.status(400).send({ error: "lastname is required" });
    }
    else if (!email) {
        return res.status(400).send({ error: "email is required" });
    }
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        yield prisma.user.update({
            where: { id: Number(id) },
            data: { firstname: firstname, lastname: lastname, email: email },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        yield prisma.user.delete({
            where: {
                id: Number(id),
            },
        });
        res.send({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
