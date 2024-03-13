import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:4500/api/v1",
  baseURL: "https://daily-doer-server.onrender.com/api/v1",
  withCredentials: true,
});

export default instance;
