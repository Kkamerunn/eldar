import { API_URL } from "../utils/constants";
import axios from "axios";

// Configure the axios client to be used all through the app
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axiosClient;
