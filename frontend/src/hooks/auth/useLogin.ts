import axios from "axios";
import useSWR from "swr";
import { httpClient } from "../../utils/httpClient";

const { BACKEND_URL = "http://localhost:3001" } = process.env;

export const UseLogin = async (userData: { email?: string; password?: string }) => {
  const url = `${BACKEND_URL}/login`

  try {
      const response = await axios.post(url, userData);
      return response.data.data
  } catch (error : any) {
    return ({error: true, message: error.response.data.message});
  }



};
