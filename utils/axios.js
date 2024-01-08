import axios from "axios";

const instance = axios.create({
  // baseURL: "",
  baseURL: "http://localhost:4500/api/v1",
  withCredentials: true,
});

export default instance;
