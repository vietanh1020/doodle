import useSWR from "swr";
import { Poll } from "../../types/poll";
import { httpClient } from "../../utils/httpClient";

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;
//GETALL [/poll]
export const useFetchPoll = async (url: string) => {
  return useSWR(url, async () => {
    const response = await httpClient.get(`${url}`);
    return response.data;
  });
};

