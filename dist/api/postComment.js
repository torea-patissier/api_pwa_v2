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
exports.deletePostComment = exports.updatePostComment = exports.createPostComment = exports.getPostCommentsByUser = exports.getPostCommentsByPost = exports.getPostCommentById = exports.getPostComments = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPostComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postComments = yield prisma.postComment.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.json(postComments);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getPostComments = getPostComments;
const getPostCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const postComment = yield prisma.postComment.findUnique({
            where: { id: Number(id) },
        });
        if (!postComment) {
            return res.status(404).send({ error: "PostComment not found" });
        }
        res.json(postComment);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getPostCommentById = getPostCommentById;
const getPostCommentsByPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.body;
    if (!postId) {
        return res.status(400).send({ error: "postId is required" });
    }
    try {
        const postComment = yield prisma.postComment.findMany({
            where: { postId: Number(postId) },
        });
        res.json(postComment);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getPostCommentsByPost = getPostCommentsByPost;
const getPostCommentsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    try {
        const postComment = yield prisma.postComment.findMany({
            where: { userId: Number(userId) },
        });
        res.json(postComment);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getPostCommentsByUser = getPostCommentsByUser;
const createPostComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, postId, text } = req.body;
    if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    else if (!postId) {
        return res.status(400).send({ error: "postId is required" });
    }
    else if (!text) {
        return res.status(400).send({ error: "text is required" });
    }
    try {
        const postComment = yield prisma.postComment.create({
            data: {
                userId: userId,
                postId: postId,
                text: text,
            },
        });
        res.status(201).json(postComment);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.createPostComment = createPostComment;
const updatePostComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId, postId, text } = req.body;
    if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    else if (!postId) {
        return res.status(400).send({ error: "postId is required" });
    }
    else if (!text) {
        return res.status(400).send({ error: "text is required" });
    }
    try {
        const postComment = yield prisma.postComment.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!postComment) {
            return res.status(404).send({ error: "PostComment not found" });
        }
        yield prisma.postComment.update({
            where: { id: Number(id) },
            data: {
                userId: userId,
                postId: postId,
                text: text,
            },
        });
        res.json(postComment);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.updatePostComment = updatePostComment;
const deletePostComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const postComment = yield prisma.postComment.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!postComment) {
            return res.status(404).send({ error: "PostComment not found" });
        }
        yield prisma.postComment.delete({
            where: {
                id: Number(id),
            },
        });
        res.send({ message: "PostComment deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.deletePostComment = deletePostComment;
