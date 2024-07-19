import axios from "axios";
export const request = axios.create({
  baseURL: "http://localhost:5000",
});

export const url = "http://localhost:5000";
export const urlLocal = "http://localhost:5000"