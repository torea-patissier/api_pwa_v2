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
exports.deleteConversation = exports.updateConversation = exports.createConversation = exports.getConversationById = exports.getConversations = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getConversations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversations = yield prisma.conversation.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.json(conversations);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getConversations = getConversations;
const getConversationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const conversation = yield prisma.conversation.findUnique({ where: { id: Number(id) } });
        if (!conversation) {
            return res.status(404).send({ error: "Conversation not found" });
        }
        res.json(conversation);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getConversationById = getConversationById;
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fromId, toId } = req.body;
    if (!fromId) {
        return res.status(400).send({ error: "fromId is required" });
    }
    else if (!toId) {
        return res.status(400).send({ error: "toId is required" });
    }
    try {
        const conversation = yield prisma.conversation.create({
            data: {
                fromId: fromId,
                toId: toId,
            },
        });
        res.status(201).json(conversation);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.createConversation = createConversation;
const updateConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { fromId, toId } = req.body;
    if (!fromId) {
        return res.status(400).send({ error: "fromId is required" });
    }
    else if (!toId) {
        return res.status(400).send({ error: "toId is required" });
    }
    try {
        const conversation = yield prisma.conversation.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!conversation) {
            return res.status(404).send({ error: "Conversation not found" });
        }
        yield prisma.conversation.update({
            where: { id: Number(id) },
            data: { fromId: fromId, toId: toId },
        });
        res.json(conversation);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.updateConversation = updateConversation;
const deleteConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const conversation = yield prisma.conversation.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!conversation) {
            return res.status(404).send({ error: "Conversation not found" });
        }
        yield prisma.conversation.delete({
            where: {
                id: Number(id),
            },
        });
        res.send({ message: "Conversation deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.deleteConversation = deleteConversation;
