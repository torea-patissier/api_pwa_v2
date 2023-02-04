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
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getPosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.json(posts);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield prisma.post.findUnique({
            where: { id: Number(id) },
        });
        if (!post) {
            return res.status(404).send({ error: "Post not found" });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getPostById = getPostById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { htmlContent, userId } = req.body;
    if (!htmlContent) {
        return res.status(400).send({ error: "htmlContent is required" });
    }
    else if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    try {
        const post = yield prisma.post.create({
            data: {
                htmlContent: htmlContent,
                userId: userId,
            },
        });
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { htmlContent, userId } = req.body;
    if (!htmlContent) {
        return res.status(400).send({ error: "htmlContent is required" });
    }
    else if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    try {
        const post = yield prisma.post.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!post) {
            return res.status(404).send({ error: "Post not found" });
        }
        yield prisma.post.update({
            where: { id: Number(id) },
            data: {
                htmlContent: htmlContent,
                userId: userId,
            },
        });
        res.json(post);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield prisma.post.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!post) {
            return res.status(404).send({ error: "Post not found" });
        }
        yield prisma.post.delete({
            where: {
                id: Number(id),
            },
        });
        res.send({ message: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.deletePost = deletePost;
