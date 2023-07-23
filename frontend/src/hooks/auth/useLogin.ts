import { CredentialResponse } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { httpClient } from "../../utils/httpClient";

export const login = async (userData: CredentialResponse) => {
  try {
    const response = await httpClient.post("/login", userData);
    return response.data.data;
  } catch (error: any) {
    toast.error(error);
  }
};
