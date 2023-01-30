import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as AWS from 'aws-sdk';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({region: process.env.REGION});


app.get('/', (req: Request, res: Response) => {
  res.send('Express +  COUCOU TypeScript Server');
});
app.post('/user/register/', async (req: Request, res: Response) => {
  const {email, password, name} = req.body;

  try {
    const params = {
      ClientId: `${process.env.CLIENT_ID}` || '3fj5qpl60j3bb6nq3f92os63ui',
      Password: password,
      Username: email,
      UserAttributes: [{Name: 'name', Value: name}],
    };
    await cognitoIdentityServiceProvider.signUp(params).promise();

    res.json({message: 'User registered'});
  } catch (err) {
    res.status(400).json({message: err});
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
