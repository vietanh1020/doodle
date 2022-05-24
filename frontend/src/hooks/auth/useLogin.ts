import { httpClient } from "../../utils/httpClient";

export const UseLogin = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await httpClient.post("/login", userData);
    return response.data.data;
  } catch (error: any) {
    console.log(error);
    return { error: true, message: error.response.data.message };
  }
};
