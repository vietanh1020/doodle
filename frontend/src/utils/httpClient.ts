import axios from "axios";

const { API_URL = "http://localhost:3001" } = process.env;

export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
