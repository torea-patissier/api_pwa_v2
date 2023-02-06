import { S3Client } from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import { CreateBucketCommand } from "@aws-sdk/client-s3";

// Create s3 object
const s3Client = new S3Client({region: "us-east-1"})


// Create the Amazon S3 bucket.
export const createAmazonBucket = async (req: Request, res: Response) => {
    const params = {Bucket: "ybook2"}
    try {
        const data = await s3Client.send(new CreateBucketCommand(params));
        console.log("Success", data);
        res.status(200).json({message: "Bucket créé!"});
    } catch (err) {
        console.log("Error", err);
        res.status(400).json({message: err});
    }
};