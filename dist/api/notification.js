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
exports.deleteNotification = exports.updateNotification = exports.createNotification = exports.getNotificationById = exports.getNotifications = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield prisma.notification.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.json(notifications);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.getNotifications = getNotifications;
const getNotificationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const notification = yield prisma.notification.findUnique({
            where: { id: Number(id) },
        });
        res.json(notification);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.getNotificationById = getNotificationById;
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { read, friendshipId, conversationMessageId } = req.body;
        const notification = yield prisma.notification.create({
            data: {
                read: read,
                friendshipId: friendshipId,
                conversationMessageId: conversationMessageId,
            },
        });
        res.status(201).json(notification);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.createNotification = createNotification;
const updateNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { read } = req.body;
        const notification = yield prisma.notification.update({
            where: { id: Number(id) },
            data: { read: read },
        });
        res.json(notification);
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.updateNotification = updateNotification;
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notification = yield prisma.notification.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).send({ error: "Bad Request" });
    }
});
exports.deleteNotification = deleteNotification;
