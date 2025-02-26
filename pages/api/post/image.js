import aws from "aws-sdk";

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "ca-central-1",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET_NAME,
    Fields: { key: req.query.file },
    Expires: 60,
    Conditions: [
      ["content-length-range", 0, 1048576], // limit file size 1mb
    ],
  });

  return res.status(200).json(url);
}
