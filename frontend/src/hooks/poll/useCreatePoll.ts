import useSWR from "swr";
import { Poll } from "../../types/poll";
import axios from "axios";

const { BACKEND_URL = "http://localhost:3001" } = process.env;

export const UseCreatePoll = async (poll: Poll) => {
  const url = `${BACKEND_URL}/poll`;
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios.post(url, poll, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    return { error: true, message: error.response.data.message };
  }
};
