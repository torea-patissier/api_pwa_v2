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
exports.deletePostLike = exports.updatePostLike = exports.createPostLike = exports.getPostLikeById = exports.getPostLikes = void 0;
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
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.getPostLikes = getPostLikes;
const getPostLikeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const postLike = yield prisma.postLike.findUnique({
            where: { id: Number(id) },
        });
        res.json(postLike);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.getPostLikeById = getPostLikeById;
const createPostLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, postId } = req.body;
        const postLike = yield prisma.postLike.create({
            data: {
                userId: userId,
                postId: postId,
            },
        });
        res.status(201).json(postLike);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.createPostLike = createPostLike;
const updatePostLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId, postId } = req.body;
        const postLike = yield prisma.postLike.update({
            where: { id: Number(id) },
            data: { userId: userId, postId: postId },
        });
        res.json(postLike);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.updatePostLike = updatePostLike;
const deletePostLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const postLike = yield prisma.postLike.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.deletePostLike = deletePostLike;
