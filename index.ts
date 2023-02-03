import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as COGNITO from "./api/cognito";
import * as POST from "./api/posts";
import * as USER from "./api/users";

dotenv.config();
const cors = require("cors");
const app: Express = express();
app.use(express.json(), cors());
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("API YBook !");
});

// Cognito
app.post("/user/register/", COGNITO.register);
app.post("/user/confirm/", COGNITO.confirmRegister);
app.post("/user/login/", COGNITO.login);
app.put("/user/change_password/", COGNITO.updatePassword);
app.post("/user/logout/", COGNITO.logout);
app.post("/user/forgot_password/", COGNITO.forgotPassword);
app.post("/user/confirm_forgot_password/", COGNITO.confirmForgotPassword);

// Post
app.route("/post").get(POST.getPosts).post(POST.createPost);
app.route("/post/:id").get(POST.getPostById).put(POST.updatePost).delete(POST.deletePost);

// User
app.route("/user").get(USER.getUsers).post(USER.createUser);
app.route("/user/:id").get(USER.getUserById).put(USER.updateUser).delete(USER.deleteUser);

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`);
});
