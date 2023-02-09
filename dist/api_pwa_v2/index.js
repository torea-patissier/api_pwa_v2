"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const COGNITO = __importStar(require("./api/cognito"));
const CONVERSATION = __importStar(require("./api/conversation"));
const CONVERSATION_MESSAGE = __importStar(require("./api/conversationMessage"));
const FRIENDSHIP = __importStar(require("./api/friendship"));
const NOTIFICATION = __importStar(require("./api/notification"));
const POST = __importStar(require("./api/post"));
const POST_ATTACHMENT = __importStar(require("./api/postAttachment"));
const POST_COMMENT = __importStar(require("./api/postComment"));
const POST_LIKE = __importStar(require("./api/postLike"));
const USER = __importStar(require("./api/user"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json(), (0, cors_1.default)());
const port = process.env.PORT || 8000;
// Socket.io
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
    console.log(`Nouvelle connexion: ${socket.id}`);
    socket.on("join", (room) => {
        console.log(`Rejoindre la room: ${room}`);
        socket.join(room);
    });
    socket.on("message", (msg, room) => {
        console.log(`Message reçu: ${msg}`);
        io.to(room).emit("message", msg);
    });
    socket.on("disconnect", () => {
        console.log(`Déconnexion: ${socket.id}`);
    });
});
app.get("/", (req, res) => {
    res.send("API YBook !");
});
// COGNITO
app.post("/user/register/", COGNITO.register);
app.post("/user/confirm/", COGNITO.confirmRegister);
app.post("/user/login/", COGNITO.login);
app.put("/user/change_password/", COGNITO.updatePassword);
app.post("/user/logout/", COGNITO.logout);
app.post("/user/forgot_password/", COGNITO.forgotPassword);
app.post("/user/confirm_forgot_password/", COGNITO.confirmForgotPassword);
// CONVERSATION
app
    .route("/conversation")
    .get(CONVERSATION.getConversations)
    .post(CONVERSATION.createConversation);
app
    .route("/conversation/:id")
    .get(CONVERSATION.getConversationById)
    .put(CONVERSATION.updateConversation)
    .delete(CONVERSATION.deleteConversation);
app.post("/conversationsByUser", CONVERSATION.getConversationsByUser);
// CONVERSATION_MESSAGE
app
    .route("/conversationMessage")
    .get(CONVERSATION_MESSAGE.getConversationMessages)
    .post(CONVERSATION_MESSAGE.createConversationMessage);
app
    .route("/conversationMessage/:id")
    .get(CONVERSATION_MESSAGE.getConversationMessageById)
    .put(CONVERSATION_MESSAGE.updateConversationMessage)
    .delete(CONVERSATION_MESSAGE.deleteConversationMessage);
app.post("/conversationMessagesByConversation", CONVERSATION_MESSAGE.getConversationMessagesByConversationId);
// FRIENDSHIP
app
    .route("/friendship")
    .get(FRIENDSHIP.getFriendships)
    .post(FRIENDSHIP.createFriendship);
app
    .route("/friendship/:id")
    .get(FRIENDSHIP.getFriendshipById)
    .put(FRIENDSHIP.updateFriendship)
    .delete(FRIENDSHIP.deleteFriendship);
app.post("/friendshipsAcceptedByUser", FRIENDSHIP.getFriendshipsAcceptedByUser);
app.post("/friendshipsPendingByUser", FRIENDSHIP.getFriendshipsPendingByUser);
app.post("/friendshipsSuggestion", FRIENDSHIP.getFriendshipsSuggestion);
app.post("/friendshipsByUser", FRIENDSHIP.getAllFriendshipsByUser);
// NOTIFICATION
app
    .route("/notification")
    .get(NOTIFICATION.getNotifications)
    .post(NOTIFICATION.createNotification);
app
    .route("/notification/:id")
    .get(NOTIFICATION.getNotificationById)
    .put(NOTIFICATION.updateNotification)
    .delete(NOTIFICATION.deleteNotification);
app.post("/notificationsByUser", NOTIFICATION.getNotificationsByUser);
// POST
app.route("/post").get(POST.getPosts).post(POST.createPost);
app
    .route("/post/:id")
    .get(POST.getPostById)
    .put(POST.updatePost)
    .delete(POST.deletePost);
app.post("/postsByUser", POST.getPostsByUser);
// POST_ATTACHMENT
app
    .route("/postAttachment")
    .get(POST_ATTACHMENT.getPostAttachments)
    .post(POST_ATTACHMENT.createPostAttachment);
app
    .route("/postAttachment/:id")
    .get(POST_ATTACHMENT.getPostAttachmentById)
    .put(POST_ATTACHMENT.updatePostAttachment)
    .delete(POST_ATTACHMENT.deletePostAttachment);
// POST_COMMENT
app
    .route("/postComment")
    .get(POST_COMMENT.getPostComments)
    .post(POST_COMMENT.createPostComment);
app
    .route("/postComment/:id")
    .get(POST_COMMENT.getPostCommentById)
    .put(POST_COMMENT.updatePostComment)
    .delete(POST_COMMENT.deletePostComment);
app.post("/postCommentsByUser", POST_COMMENT.getPostCommentsByUser);
app.post("/postCommentsByPost", POST_COMMENT.getPostCommentsByPost);
// POST_LIKE
app
    .route("/postLike")
    .get(POST_LIKE.getPostLikes)
    .post(POST_LIKE.createPostLike);
app
    .route("/postLike/:id")
    .get(POST_LIKE.getPostLikeById)
    .put(POST_LIKE.updatePostLike)
    .delete(POST_LIKE.deletePostLike);
app.post("/postLikesByUser", POST_LIKE.getPostLikesByUser);
app.post("/postLikesByPost", POST_LIKE.getPostLikesByPost);
// USER
app.route("/user").get(USER.getUsers).post(USER.createUser);
app.post("/userByEmail", USER.getUserByEmail);
app
    .route("/user/:id")
    .get(USER.getUserById)
    .put(USER.updateUser)
    .delete(USER.deleteUser);
server.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port}`);
});
