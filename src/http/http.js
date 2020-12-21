import axios from "axios";

export const http = axios.create({
    baseURL: process.env.HTTP_ENDPOINT_URL,
    timeout: process.env.HTTP_TIMEOUT_SECONDS * 1000,
    headers: {
      "Content-Type": "application/json"
    }
});