import {Request, Response} from 'express';
import * as AWS from 'aws-sdk';

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({region: 'eu-west-3'});
export const register = async (req: Request, res: Response) => {
    const {email, password, name, given_name} = req.body;
    try {
        const params = {
            ClientId: '3fj5qpl60j3bb6nq3f92os63ui',
            Password: password,
            Username: email,
            UserAttributes: [{Name: 'name', Value: name}, {Name: 'given_name', Value: given_name}],
        };
        await cognitoIdentityServiceProvider.signUp(params).promise();
        res.json({message: 'User registered'});
    } catch (err) {
        res.status(400).json({message: err});
    }
}
export const confirmRegister = async (req: Request, res: Response) => {
    const {email, confirmationCode} = req.body;
    const params = {
        ClientId: '3fj5qpl60j3bb6nq3f92os63ui',
        ConfirmationCode: confirmationCode,
        Username: email,
    };

    try {
        await cognitoIdentityServiceProvider.confirmSignUp(params).promise();
        res.json({message: 'User confirmed'});
    } catch (err) {
        res.status(400).json({message: err});
    }
}
export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: '3fj5qpl60j3bb6nq3f92os63ui',
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        };
        const cognitoUser = await cognitoIdentityServiceProvider.initiateAuth(params).promise();

        res.json({message: 'User logged in', cognitoUser});
    } catch (err) {
        res.status(400).json({message: err});
    }
}

