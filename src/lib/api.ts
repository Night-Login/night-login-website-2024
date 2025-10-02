import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

/**
 * Create an axios instance configured for authenticated requests
 * This automatically attaches the access token from NextAuth session
 */
export const createAuthenticatedAxios = async (): Promise<AxiosInstance> => {
  const session = await getSession();
  
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add interceptor to attach token to all requests
  instance.interceptors.request.use(
    async (config) => {
      const token = session?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add interceptor to handle 401 errors (unauthorized)
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid - redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/requests/login";
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Make an authenticated API request
 * @param config Axios request configuration
 */
export const authenticatedRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  const axiosInstance = await createAuthenticatedAxios();
  const response = await axiosInstance.request<T>(config);
  return response.data;
};

/**
 * Helper functions for common HTTP methods
 */
export const api = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return authenticatedRequest<T>({ ...config, method: "GET", url });
  },

  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return authenticatedRequest<T>({ ...config, method: "POST", url, data });
  },

  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return authenticatedRequest<T>({ ...config, method: "PUT", url, data });
  },

  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return authenticatedRequest<T>({ ...config, method: "DELETE", url });
  },

  patch: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return authenticatedRequest<T>({ ...config, method: "PATCH", url, data });
  },
};
