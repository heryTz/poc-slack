import axios, { CreateAxiosDefaults } from "axios";
import { serviceOptions } from "src/api-sdk";

export function setupSDK() {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
  });

  serviceOptions.axios = instance;
}

export function updateAxiosInstance(config: CreateAxiosDefaults<unknown> = {}) {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    ...config,
  });
  serviceOptions.axios = instance;
}
