import axios from "axios";

const PORT = import.meta.env.VITE_API_PORT || "8090";
const BASE_URL = `https://intranet.urgencesante.fr:${PORT}`;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default client;
