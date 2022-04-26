import useSWR from "swr";
import { Poll } from "../../types/poll";
import { httpClient } from "../../utils/httpClient";

export const useFetchPoll = (pollData: Poll) => {
  return useSWR("/poll", async () => {
    const response = await httpClient.post("/poll", pollData);
    return response.data;
  });
};
