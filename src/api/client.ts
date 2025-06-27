import axios from "axios";
import keycloak from "../Keycloak/Keycloak";

// const PORT = import.meta.env.VITE_API_PORT || "8090";
const BASE_URL = `https://notification-api.delesse.net`;
// const BASE_URL = `https://intranet.urgencesante.fr:${PORT}`;
const GEO_BASE_URL = `https://intranet.urgencesante.fr:8091/`;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const geoClient = axios.create({
  baseURL: GEO_BASE_URL,
  timeout: 10000,
});

// Intercepteur : ajoute le token à chaque requête
client.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    await keycloak.updateToken(60); // refresh si bientôt expiré
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }

  return config;
});

geoClient.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    await keycloak.updateToken(60); // refresh si bientôt expiré
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }

  return config;
});

export default client;
