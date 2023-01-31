import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as USER from "./api/users";

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Ca marche! Mais que sur cette route...');
});

app.post('/user/register/', USER.register);
app.post('/user/confirm/',USER.confirmRegister);
app.post('/user/login/', USER.login);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
