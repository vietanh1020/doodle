import axios from "axios";
const { API_URL = "http://localhost:3001" } = process.env;

export const UseRegister = async (userData: {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}) => {
  const url = `${API_URL}/register`;

  try {
    const response = await axios.post(url, userData);
    return response.data.data;
  } catch (error: any) {
    return { error: true, message: error.response.data.message };
  }
};
