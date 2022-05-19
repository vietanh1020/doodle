import { Poll } from "../../types/poll";
import { httpClient } from "../../utils/httpClient";

export const updatePoll = async (poll: Poll, id: string) => {
  try {
    const response = await httpClient.put(`/poll/${id}`, poll);
    return response;
  } catch (error: any) {
    console.log(error);
    return { error: true, message: error.response.data.message };
  }
};
