import { Request, Response } from "express";
import { S3 } from "aws-sdk";
import fs from "fs";

/*const region = process.env.REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_KEY;*/

// Create s3 object
const s3Client = new S3({
    region:"us-east-1",
    accessKeyId: "AKIA3NBO6MDINT32XNWY",
    secretAccessKey: "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"
})


// Create the Amazon S3 bucket.
export const createAmazonBucket = async (req: Request, res: Response) => {
    const bucketName = "ybook2"
    const params = {Bucket: bucketName}
    try {
        const data = await s3Client.createBucket(params, (err,data)=>{
            if (err){
                console.error(err);
            }
            console.log("Success", data);
            res.status(200).json({message: "Bucket créé!"});
        })
    } catch (err) {
        console.log("Error", err);
        res.status(400).json({message: err});
    }
};

// upload an objet to S3 bucket
export const addObject = async (req: Request, res: Response) => {
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
/*export const collectObject = async (req: Request, res: Response) => {
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

export const Upload = (file: any)=> {
    const fileStream = fs.createReadStream(file.path)
    
    const uploadParams = {
        Bucket: "ybook2",
        Body: fileStream,
        Key: file.originalname
    }

    return s3Client.upload(uploadParams).promise()
}

//Download a file from S3

export const Download = (filekey: any)=> {
    const params = {
        Bucket: "ybook2",
        Key: filekey
    }

    return s3Client.getObject(params).createReadStream()
}
