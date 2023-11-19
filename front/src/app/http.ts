import axios from "axios";
import { serviceOptions } from "src/api-sdk";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

serviceOptions.axios = instance;
