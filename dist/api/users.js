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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmForgotPassword = exports.forgotPassword = exports.logout = exports.updatePassword = exports.login = exports.confirmRegister = exports.register = void 0;
const AWS = __importStar(require("aws-sdk"));
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ region: 'eu-west-3' });
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, given_name } = req.body;
    try {
        const params = {
            ClientId: '3fj5qpl60j3bb6nq3f92os63ui',
            Password: password,
            Username: email,
            UserAttributes: [{ Name: 'name', Value: name }, { Name: 'given_name', Value: given_name }],
        };
        yield cognitoIdentityServiceProvider.signUp(params).promise();
        res.json({ message: 'User registered' });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.register = register;
const confirmRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, confirmationCode } = req.body;
    const params = {
        ClientId: '3fj5qpl60j3bb6nq3f92os63ui',
        ConfirmationCode: confirmationCode,
        Username: email,
    };
    try {
        yield cognitoIdentityServiceProvider.confirmSignUp(params).promise();
        res.json({ message: 'User confirmed' });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.confirmRegister = confirmRegister;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: '3fj5qpl60j3bb6nq3f92os63ui',
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        };
        const cognitoUser = yield cognitoIdentityServiceProvider.initiateAuth(params).promise();
        res.json({ message: 'User logged in', cognitoUser });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.login = login;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, previousPassword, proposedPassword } = req.body;
    try {
        const params = {
            AccessToken: accessToken,
            PreviousPassword: previousPassword,
            ProposedPassword: proposedPassword
        };
        yield cognitoIdentityServiceProvider.changePassword(params).promise();
        res.status(200).json({ message: 'Password successfully changed' });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.updatePassword = updatePassword;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body;
    try {
        const params = {
            AccessToken: accessToken
        };
        yield cognitoIdentityServiceProvider.globalSignOut(params);
        res.status(200).json({ message: "Successfully log out" });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const params = {
        ClientId: '3fj5qpl60j3bb6nq3f92os63ui',
        Username: email
    };
    yield cognitoIdentityServiceProvider.forgotPassword(params, (err, data) => {
        if (err) {
            res.status(400).json({ message: 'The password reinitialization failed', error: err });
        }
        else {
            res.json({ message: `A code validation is sent to you for your forgotten password ${JSON.stringify(data)}` });
        }
    });
});
exports.forgotPassword = forgotPassword;
const confirmForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmationCode, newPassword, email } = req.body;
    const params = {
        ClientId: '3fj5qpl60j3bb6nq3f92os63ui',
        ConfirmationCode: confirmationCode,
        Password: newPassword,
        Username: email
    };
    yield cognitoIdentityServiceProvider.confirmForgotPassword(params, function (err, data) {
        if (err) {
            res.status(400).json({ message: 'Wrong confirmation code', error: err });
        }
        else {
            res.json({ message: `Password changed successfully ${JSON.stringify(data)}` });
        }
    });
});
exports.confirmForgotPassword = confirmForgotPassword;
