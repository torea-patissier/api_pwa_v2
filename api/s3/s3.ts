import { Request, Response } from "express";
import { S3 } from "aws-sdk";

// Create s3 object
const s3Client = new S3({
    region:"us-east-1",
    accessKeyId:'AKIA3NBO6MDINT32XNWY',
    secretAccessKey:'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'
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
