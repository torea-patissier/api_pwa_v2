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
const POST_LIKE = __importStar(require("./api/postLike"));
const USER = __importStar(require("./api/user"));
dotenv_1.default.config();
const cors = require("cors");
const app = (0, express_1.default)();
app.use(express_1.default.json(), cors());
const port = process.env.PORT || 8000;
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
// POST
app.route("/post").get(POST.getPosts).post(POST.createPost);
app
    .route("/post/:id")
    .get(POST.getPostById)
    .put(POST.updatePost)
    .delete(POST.deletePost);
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
// USER
app.route("/user").get(USER.getUsers).post(USER.createUser);
app
    .route("/user/:id")
    .get(USER.getUserById)
    .put(USER.updateUser)
    .delete(USER.deleteUser);
app.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port}`);
});
