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
exports.deleteFriendship = exports.updateFriendship = exports.createFriendship = exports.getFriendshipsSuggestion = exports.getFriendshipsByUserAndStatus = exports.getFriendshipById = exports.getFriendships = void 0;
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
        res.status(500).send({ error: error.message });
    }
});
exports.getFriendships = getFriendships;
const getFriendshipById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const friendship = yield prisma.friendship.findUnique({
            where: { id: Number(id) },
        });
        if (!friendship) {
            return res.status(404).send({ error: "Friendship not found" });
        }
        res.json(friendship);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getFriendshipById = getFriendshipById;
const getFriendshipsByUserAndStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, status } = req.body;
    if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    if (!status) {
        return res.status(400).send({ error: "status is required" });
    }
    try {
        const friendships = yield prisma.friendship.findMany({
            where: {
                OR: [
                    {
                        fromId: Number(userId),
                    },
                    { toId: Number(userId) },
                ],
                AND: {
                    status: status,
                },
            },
        });
        res.json(friendships);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getFriendshipsByUserAndStatus = getFriendshipsByUserAndStatus;
const getFriendshipsSuggestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    try {
        const friendships = yield prisma.friendship.findMany({
            where: {
                OR: [
                    {
                        fromId: Number(userId),
                    },
                    { toId: Number(userId) },
                ],
            },
        });
        const friendIds = friendships.map((friendship) => {
            if (friendship.fromId === Number(userId)) {
                return friendship.toId;
            }
            return friendship.fromId;
        });
        const users = yield prisma.user.findMany({
            where: {
                id: {
                    notIn: friendIds,
                },
            },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getFriendshipsSuggestion = getFriendshipsSuggestion;
const createFriendship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, fromId, toId } = req.body;
    if (!status) {
        return res.status(400).send({ error: "status is required" });
    }
    else if (!fromId) {
        return res.status(400).send({ error: "fromId is required" });
    }
    else if (!toId) {
        return res.status(400).send({ error: "toId is required" });
    }
    try {
        const friendship = yield prisma.friendship.create({
            data: {
                status: status,
                fromId: fromId,
                toId: toId,
            },
        });
        res.status(201).json(friendship);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.createFriendship = createFriendship;
const updateFriendship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status, fromId, toId } = req.body;
    if (!status) {
        return res.status(400).send({ error: "status is required" });
    }
    else if (!fromId) {
        return res.status(400).send({ error: "fromId is required" });
    }
    else if (!toId) {
        return res.status(400).send({ error: "toId is required" });
    }
    try {
        const friendship = yield prisma.friendship.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!friendship) {
            return res.status(404).send({ error: "Friendship not found" });
        }
        const newFriendship = yield prisma.friendship.update({
            where: { id: Number(id) },
            data: { status: status, fromId: fromId, toId: toId },
        });
        res.json(newFriendship);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.updateFriendship = updateFriendship;
const deleteFriendship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const friendship = yield prisma.friendship.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!friendship) {
            return res.status(404).send({ error: "Friendship not found" });
        }
        yield prisma.friendship.delete({
            where: {
                id: Number(id),
            },
        });
        res.send({ message: "Friendship deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.deleteFriendship = deleteFriendship;
