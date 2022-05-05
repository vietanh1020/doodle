import axios from "axios";

export const UseLogin = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post("http://localhost:3001/login", userData);
    return response.data.data;
  } catch (error: any) {
    console.log(error);
    return { error: true, message: error.response.data.message };
  }
};
