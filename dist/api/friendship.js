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
exports.deleteFriendship = exports.updateFriendship = exports.createFriendship = exports.getFriendshipById = exports.getFriendships = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getFriendships = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendships = yield prisma.friendship.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.json(friendships);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.getFriendships = getFriendships;
const getFriendshipById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const friendship = yield prisma.friendship.findUnique({
            where: { id: Number(id) },
        });
        res.json(friendship);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.getFriendshipById = getFriendshipById;
const createFriendship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, fromId, toId } = req.body;
        const friendship = yield prisma.friendship.create({
            data: {
                status: status,
                fromId: Number(fromId),
                toId: Number(toId),
            },
        });
        res.status(201).json(friendship);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.createFriendship = createFriendship;
const updateFriendship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status, fromId, toId } = req.body;
        const friendship = yield prisma.friendship.update({
            where: { id: Number(id) },
            data: { status: status, fromId: Number(fromId), toId: Number(toId) },
        });
        res.json(friendship);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.updateFriendship = updateFriendship;
const deleteFriendship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const friendship = yield prisma.friendship.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.deleteFriendship = deleteFriendship;
