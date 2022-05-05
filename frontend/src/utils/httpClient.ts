import axios from "axios";

const { API_URL = "http://localhost:3001" } = process.env;

const access_token = localStorage.getItem("access_token");

export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${access_token}`,
    // "Content-Type": `application/json`,
  },
});
