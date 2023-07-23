import { Poll } from "../../types/poll";
import { httpClient } from "../../utils/httpClient";
import axios from "axios";

export const updatePoll = async (poll: Poll, id: string) => {
  try {
    const response = await httpClient.put(`/poll/${id}`, poll);
    return response;
  } catch (error: any) {
    console.log(error);
    return { error: true, message: error.response.data.message };
  }
};

const uploadFile = async (
  file: File,
  url: string,
  fields: Record<string, string>
) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append("file", file);
  return axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const presignFile = async (file: File) => {
  const res = await httpClient.post("poll/uploadFile", {
    fileName: file.name,
  });
  const preSign = res.data as PreSignFile;
  await uploadFile(file, preSign.postURL, preSign.formData);
  return `${preSign.postURL}/${preSign.formData.key}`;
};

export type PreSignFile = {
  formData: FormData;
  postURL: string;
};

export type FormData = {
  key: string;
  policy: string;
  "Content-Type": string;
  "x-amz-algorithm": string;
  "x-amz-credential": string;
  "x-amz-date": string;
  "x-amz-signature": string;
};
