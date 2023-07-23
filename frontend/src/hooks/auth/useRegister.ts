import { httpClient } from "../../utils/httpClient";
const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

export const UseRegister = async (userData: {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}) => {
  try {
    const response = await httpClient.post("/register", userData);
    return response.data.data;
  } catch (error: any) {
    return { error: true, message: error.response.data.message };
  }
};

