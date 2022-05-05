import axios from "axios";
import { Poll } from "../../types/poll";
import { httpClient } from "../../utils/httpClient";
import { useGetSlug } from "../help/useGetSlug";

export const updatePoll = async (poll: Poll, id: string) => {
  try {
    const response = await httpClient.put(`/poll/${id}`, poll);
    console.log(poll);

    // const response = await axios.patch(
    //   `http://localhost:3001/poll/${id}`,
    //   poll,
    //   {
    //     headers: {
    //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUxNjUxODQ2LCJleHAiOjE2NTQyNDM4NDZ9.OHw2Dg-lOZS53TC41zC4wNyq-cheJrsPgYbGQHiGYtE`,
    //     },
    //   }
    // );
    console.log(response.data);

    return response.data.data;
  } catch (error: any) {
    console.log(error);

    // return { error: true, message: error.response.data.message };
  }
};
