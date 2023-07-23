import axios from "axios";

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

export const httpClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
