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
exports.deletePostLike = exports.updatePostLike = exports.createPostLike = exports.getPostLikesByUser = exports.getPostLikesByPost = exports.getPostLikeById = exports.getPostLikes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPostLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postLikes = yield prisma.postLike.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.json(postLikes);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getPostLikes = getPostLikes;
const getPostLikeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const postLike = yield prisma.postLike.findUnique({
            where: { id: Number(id) },
        });
        if (!postLike) {
            return res.status(404).send({ error: "PostLike not found" });
        }
        res.json(postLike);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getPostLikeById = getPostLikeById;
const getPostLikesByPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.body;
    if (!postId) {
        return res.status(400).send({ error: "postId is required" });
    }
    try {
        const postLike = yield prisma.postLike.findMany({
            where: { postId: Number(postId) },
        });
        res.json(postLike);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getPostLikesByPost = getPostLikesByPost;
const getPostLikesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    try {
        const postLike = yield prisma.postLike.findMany({
            where: { userId: Number(userId) },
        });
        res.json(postLike);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getPostLikesByUser = getPostLikesByUser;
const createPostLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, postId } = req.body;
    if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    else if (!postId) {
        return res.status(400).send({ error: "postId is required" });
    }
    try {
        const postLike = yield prisma.postLike.create({
            data: {
                userId: userId,
                postId: postId,
            },
        });
        res.status(201).json(postLike);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.createPostLike = createPostLike;
const updatePostLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId, postId } = req.body;
    if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    else if (!postId) {
        return res.status(400).send({ error: "postId is required" });
    }
    try {
        const postLike = yield prisma.postLike.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!postLike) {
            return res.status(404).send({ error: "PostLike not found" });
        }
        const newPostLike = yield prisma.postLike.update({
            where: { id: Number(id) },
            data: {
                userId: userId,
                postId: postId,
            },
        });
        res.json(newPostLike);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.updatePostLike = updatePostLike;
const deletePostLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const postLike = yield prisma.postLike.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!postLike) {
            return res.status(404).send({ error: "PostLike not found" });
        }
        yield prisma.postLike.delete({
            where: {
                id: Number(id),
            },
        });
        res.send({ message: "PostLike deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.deletePostLike = deletePostLike;
