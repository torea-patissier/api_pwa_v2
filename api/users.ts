import {Request, Response} from 'express';
import * as AWS from 'aws-sdk';

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({region: 'eu-west-3'});
export const registerRoute = async (req: Request, res: Response) => {
    const {email, password, name} = req.body;
    try {
        const params = {
            ClientId: '3fj5qpl60j3bb6nq3f92os63ui',
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
