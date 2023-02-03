import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as COGNITO from "./api/cognito";
import * as CONVERSATION from "./api/conversation";
import * as CONVERSATION_MESSAGE from "./api/conversationMessage";
import * as FRIENDSHIP from "./api/friendship";
import * as NOTIFICATION from "./api/notification";
import * as POST from "./api/post";
import * as POST_ATTACHMENT from "./api/postAttachment";
import * as POST_LIKE from "./api/postLike";
import * as USER from "./api/user";

dotenv.config();
const cors = require("cors");
const app: Express = express();
app.use(express.json(), cors());
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
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
