import { Axios } from "axios";

const { API_URL = "http://localhost:3001" } = process.env;

const access_token = localStorage.getItem("access_token");

export const fetchData = new Axios({
  url: API_URL,
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

export const postData = new Axios({
  url: API_URL,
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

