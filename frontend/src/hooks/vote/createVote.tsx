import { Vote } from "../../types/vote";
import { httpClient } from "../../utils/httpClient";
import { useGetSlug } from "../help/useGetSlug";

export const createVote = async (vote: Vote, id: string  ) => {
  try {
    const response = await httpClient.post(`/vote/${id}`, vote);
    return response.data.data;
  } catch (error: any) {
    console.log(error);
  }
};
