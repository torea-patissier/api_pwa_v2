import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as USER from "./api/users";
import * as POST from "./api/posts";

dotenv.config();
const cors = require("cors");
const app: Express = express();
app.use(express.json(), cors());
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Ca marche! Mais que sur cette route...");
});

app.post("/user/register/", USER.register);
app.post("/user/confirm/", USER.confirmRegister);
app.post("/user/login/", USER.login);
app.put("/user/change_password/", USER.updatePassword);
app.post("/user/logout/", USER.logout);
app.post("/user/forgot_password/", USER.forgotPassword);
app.post("/user/confirm_forgot_password/", USER.confirmForgotPassword);
app.post("/posts/", POST.getPosts);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
