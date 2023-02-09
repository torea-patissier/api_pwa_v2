import fs from "fs";
import { S3 } from "aws-sdk";

// Create s3 object
const s3Client = new S3({
    region:"us-east-1",
    accessKeyId: "AKIA3NBO6MDINT32XNWY",
    secretAccessKey: "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"
})

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
