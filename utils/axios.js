import axios from "axios";

const instance = axios.create({
  baseURL: "https://daily-doer-server.onrender.com/api/v1",
  // baseURL: "http://localhost:4500/api/v1",
  withCredentials: true,
});

export default instance;
