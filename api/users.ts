import {Request, Response} from 'express';
import * as AWS from 'aws-sdk';

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({region: `${process.env.REGION}`});
export const registerRoute = async (req: Request, res: Response) => {
    const {email, password, name} = req.body;
    try {
        const params = {
            ClientId: `${process.env.CLIENT_ID}`,
            Password: password,
            Username: email,
            UserAttributes: [{Name: 'name', Value: name}],
        };
        await cognitoIdentityServiceProvider.signUp(params).promise();
        res.json({message: 'User registered'});
    } catch (err) {
        res.status(400).json({message: err});
    }
}
