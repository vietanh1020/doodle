import Minio from "minio";
import moment from "moment";

const {
  MINIO_ENDPOINT,
  MINIO_PORT,
  MINIO_PUBLIC,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
} = process.env;

export class MinioService {
  private readonly bucketName: string = "doodle";
  private readonly minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: MINIO_ENDPOINT,
      port: Number(MINIO_PORT),
      useSSL: true,
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY,
    });
    this.initBucket();
  }

  private async initBucket() {
    const exists = await this.minioClient.bucketExists(this.bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(this.bucketName, "us-east-1");
      console.debug("create bucket successfully");
    }
  }

  async upload({ fileName, buffer }: { fileName: string; buffer: Buffer }) {
    const dateTime = moment().format("YYYY-MM-DD");
    const filePath = `${dateTime}/${fileName}`;

    this.minioClient.putObject(
      this.bucketName,
      filePath,
      buffer,
      async (err) => {
        if (err) console.error(err);
        console.log("upload file successfully");
      }
    );

    return this.minioClient.presignedGetObject(this.bucketName, filePath);
  }

  async getPresignedUrl(filename: string) {
    const dateTime = moment().format("YYYY-MM-DD");
    const key = `${dateTime}/${filename}`;
    const policy = new Minio.PostPolicy();
    policy.setBucket(this.bucketName);
    policy.setKey(key);

    const presignedUrl = await this.minioClient.presignedPostPolicy(policy);
    presignedUrl.postURL = MINIO_PUBLIC ?? "";

    return presignedUrl;
  }
}
