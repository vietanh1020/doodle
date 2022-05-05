import { Poll } from "../../types/poll";
import { httpClient } from "../../utils/httpClient";

export const UseCreatePoll = async (poll: Poll) => {
  try {
    const response = await httpClient.post("/poll", poll);
    return response.data.data;
  } catch (error: any) {
    console.log(error);

    // return { error: true, message: error.response.data.message };
  }
};
