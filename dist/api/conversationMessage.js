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
exports.deleteConversationMessage = exports.updateConversationMessage = exports.createConversationMessage = exports.getConversationMessagesByConversationId = exports.getConversationMessageById = exports.getConversationMessages = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getConversationMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversationMessages = yield prisma.conversationMessage.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.json(conversationMessages);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getConversationMessages = getConversationMessages;
const getConversationMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const conversationMessage = yield prisma.conversationMessage.findUnique({
            where: { id: Number(id) },
        });
        if (!conversationMessage) {
            return res.status(404).send({ error: "ConversationMessage not found" });
        }
        res.json(conversationMessage);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getConversationMessageById = getConversationMessageById;
const getConversationMessagesByConversationId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { conversationId } = req.body;
    if (!conversationId) {
        return res.status(404).send({ error: "conversationId is required" });
    }
    try {
        const conversationMessage = yield prisma.conversationMessage.findMany({
            where: { conversationId: Number(conversationId) },
        });
        res.json(conversationMessage);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getConversationMessagesByConversationId = getConversationMessagesByConversationId;
const createConversationMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { conversationId, userId, content } = req.body;
    if (!conversationId) {
        return res.status(400).send({ error: "conversationId is required" });
    }
    else if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    else if (!content) {
        return res.status(400).send({ error: "content is required" });
    }
    try {
        const conversationMessage = yield prisma.conversationMessage.create({
            data: {
                conversationId: conversationId,
                userId: userId,
                content: content,
            },
        });
        res.status(201).json(conversationMessage);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.createConversationMessage = createConversationMessage;
const updateConversationMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { conversationId, userId, content } = req.body;
    if (!conversationId) {
        return res.status(400).send({ error: "conversationId is required" });
    }
    else if (!userId) {
        return res.status(400).send({ error: "userId is required" });
    }
    else if (!content) {
        return res.status(400).send({ error: "content is required" });
    }
    try {
        const conversationMessage = yield prisma.conversationMessage.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!conversationMessage) {
            return res.status(404).send({ error: "ConversationMessage not found" });
        }
        const newConversationMessage = yield prisma.conversationMessage.update({
            where: { id: Number(id) },
            data: {
                conversationId: conversationId,
                userId: userId,
                content: content,
            },
        });
        res.json(newConversationMessage);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.updateConversationMessage = updateConversationMessage;
const deleteConversationMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const conversationMessage = yield prisma.conversationMessage.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!conversationMessage) {
            return res.status(404).send({ error: "ConversationMessage not found" });
        }
        yield prisma.conversationMessage.delete({
            where: {
                id: Number(id),
            },
        });
        res.send({ message: "ConversationMessage deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.deleteConversationMessage = deleteConversationMessage;
