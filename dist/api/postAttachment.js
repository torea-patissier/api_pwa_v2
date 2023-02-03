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
exports.deletePostAttachment = exports.updatePostAttachment = exports.createPostAttachment = exports.getPostAttachmentById = exports.getPostAttachments = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPostAttachments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postAttachments = yield prisma.postAttachment.findMany({});
        res.json(postAttachments);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.getPostAttachments = getPostAttachments;
const getPostAttachmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const postAttachment = yield prisma.postAttachment.findUnique({
            where: { id: Number(id) },
        });
        res.json(postAttachment);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.getPostAttachmentById = getPostAttachmentById;
const createPostAttachment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, s3Key, postId } = req.body;
        const postAttachment = yield prisma.postAttachment.create({
            data: {
                type: type,
                s3Key: s3Key,
                postId: postId,
            },
        });
        res.status(201).json(postAttachment);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.createPostAttachment = createPostAttachment;
const updatePostAttachment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { type, s3Key, postId } = req.body;
        const postAttachment = yield prisma.postAttachment.update({
            where: { id: Number(id) },
            data: { type: type, s3Key: s3Key, postId: postId },
        });
        res.json(postAttachment);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.updatePostAttachment = updatePostAttachment;
const deletePostAttachment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const postAttachment = yield prisma.postAttachment.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.deletePostAttachment = deletePostAttachment;
