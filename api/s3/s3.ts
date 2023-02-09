import { Request, Response } from "express";
import { S3 } from "aws-sdk";
import fs from "fs";
import { Download, Upload } from "./upload";


// Create s3 object
const s3Client = new S3({
    region:"us-east-1",
    accessKeyId: "AKIA3NBO6MDINT32XNWY",
    secretAccessKey: "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"
})


// Create the Amazon S3 bucket.
export const createAmazonBucket = async (req: Request, res: Response) => {
    const bucketName = "ybook4"
    const params = {Bucket: bucketName}
    try {
        const data = await s3Client.createBucket(params).promise()
        res.status(200).json({data})
    } catch (err) {
        console.log("Error", err);
        res.status(400).json({message: err});
    }
};


//Upload a file to S3

export const uploadFile = async(req:Request, res: Response)=>{
    try{
      const file = req.file;
      console.log(file);
      const result = await Upload(file);
      console.log(result);
      res.status(200).json({message: `Fichier ${result.Key} uploadé`})
    }catch(err){
      res.status(500).json(err)
    }
    
  }

//Download a file from S3

export const downloadFile = (req:Request, res:Response)=>{
    try{
      const key = req.params.key
      console.log(key)
      const readStream = Download(key)
      console.log(readStream.pipe(res))
      readStream.pipe(res)
      res.status(200).json({message: "Fichier téléchargé!"})
    }catch(err){
      res.status(500).json(err)
    }
    
  
  }


