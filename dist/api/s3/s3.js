"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Download = exports.Upload = exports.createAmazonBucket = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
/*const region = process.env.REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_KEY;*/
// Create s3 object
const s3Client = new aws_sdk_1.S3({
    region: "us-east-1",
    accessKeyId: "AKIA3NBO6MDINT32XNWY",
    secretAccessKey: "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"
});
// Create the Amazon S3 bucket.
const createAmazonBucket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bucketName = "ybook3";
    const params = { Bucket: bucketName };
    try {
        const data = yield s3Client.createBucket(params).promise();
        res.status(200).json({ message: "Je suis créé" });
    }
    catch (err) {
        console.log("Error", err);
        res.status(400).json({ message: err });
    }
});
exports.createAmazonBucket = createAmazonBucket;
// upload an objet to S3 bucket
/*export const addObject = async (req: Request, res: Response) => {
    const params = {
        Bucket: "ybook2",
        Key: "ybook2.pdf",
        Body: new Buffer('Juste un file')
    }
    try {
        const data = await s3Client.putObject(params, (err,data)=>{
            if (err){
                console.error(err);
            }
            console.log("Success", data);
            res.status(200).json({message: "Fichier ajouté"});
        })
    } catch (err) {
        console.log("Error", err);
        res.status(400).json({message: err});
    }
};

//Collect an object from S3 bucket
export const collectObject = async (req: Request, res: Response) => {
    const params = {
        Bucket: "ybook2",
        Key: "ybook.pdf",
        Body: new Buffer('Juste un fichier')
    }
    try {
        const data = await s3Client.putObject(params, (err,data)=>{
            if (err){
                console.error(err);
            }
            console.log("Success", data);
            res.status(200).json({message: "Fichier ajouté"});
        })
    } catch (err) {
        console.log("Error", err);
        res.status(400).json({message: err});
    }
};*/
//Upload a file to S3
const Upload = (file) => {
    const fileStream = fs_1.default.createReadStream(file.path);
    const uploadParams = {
        Bucket: "ybook2",
        Body: fileStream,
        Key: file.originalname
    };
    return s3Client.upload(uploadParams).promise();
};
exports.Upload = Upload;
//Download a file from S3
const Download = (filekey) => {
    const params = {
        Bucket: "ybook2",
        Key: filekey
    };
    return s3Client.getObject(params).createReadStream();
};
exports.Download = Download;
