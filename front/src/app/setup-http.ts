import axios, { CreateAxiosDefaults } from "axios";
import { serviceOptions } from "src/api-sdk";
import { useUserStore } from "./auth/lib/useAuth";

export function setupSDK() {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: { Authorization: `Bearer ${useUserStore.getState().token}` },
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
