import * as Minio from "minio";
import moment from "moment";

const {
  MINIO_ENDPOINT,
  MINIO_PORT,
  MINIO_PUBLIC,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
} = process.env;

const bucketName: string = "doodle";
const minioClient = new Minio.Client({
  endPoint: MINIO_ENDPOINT,
  port: Number(MINIO_PORT),
  useSSL: false,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
});

(async function initBucket() {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, "us-east-1");
    console.debug("create bucket successfully");
  }
})();

async function upload({
  fileName,
  buffer,
}: {
  fileName: string;
  buffer: Buffer;
}) {
  const dateTime = moment().format("YYYY-MM-DD");
  const filePath = `${dateTime}/${fileName}`;

  minioClient.putObject(bucketName, filePath, buffer, async (err) => {
    if (err) console.error(err);
    console.log("upload file successfully");
  });
  return minioClient.presignedGetObject(bucketName, filePath);
}

async function getPresignedUrl(filename: string) {
  const dateTime = moment().format("YYYY-MM-DD");
  const key = `${dateTime}/${filename}`;
  const policy = new Minio.PostPolicy();
  policy.setBucket("doodle");
  policy.setKey(key);

  const presignedUrl = await minioClient.presignedPostPolicy(policy);
  presignedUrl.postURL = MINIO_PUBLIC ?? "";

  return presignedUrl;
}

export const minioService = {
  upload,
  getPresignedUrl,
};
