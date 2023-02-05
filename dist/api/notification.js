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
        res.status(500).send({ error: error.message });
    }
});
exports.getNotifications = getNotifications;
const getNotificationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const notification = yield prisma.notification.findUnique({
            where: { id: Number(id) },
        });
        if (!notification) {
            return res.status(404).send({ error: "Notification not found" });
        }
        res.json(notification);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getNotificationById = getNotificationById;
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { read, friendshipId, conversationMessageId } = req.body;
    if (!read) {
        return res.status(400).send({ error: "read is required" });
    }
    else if (!friendshipId) {
        return res.status(400).send({ error: "friendshipId is required" });
    }
    try {
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
        res.status(500).send({ error: error.message });
    }
});
exports.createNotification = createNotification;
const updateNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { read, friendshipId, conversationMessageId } = req.body;
    if (!read) {
        return res.status(400).send({ error: "read is required" });
    }
    else if (!friendshipId) {
        return res.status(400).send({ error: "friendshipId is required" });
    }
    try {
        const notification = yield prisma.notification.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!notification) {
            return res.status(404).send({ error: "Notification not found" });
        }
        const newNotification = yield prisma.notification.update({
            where: { id: Number(id) },
            data: {
                read: read,
                friendshipId: friendshipId,
                conversationMessageId: conversationMessageId,
            },
        });
        res.json(newNotification);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.updateNotification = updateNotification;
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const notification = yield prisma.notification.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!notification) {
            return res.status(404).send({ error: "Notification not found" });
        }
        yield prisma.notification.delete({
            where: {
                id: Number(id),
            },
        });
        res.send({ message: "Notification deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.deleteNotification = deleteNotification;
