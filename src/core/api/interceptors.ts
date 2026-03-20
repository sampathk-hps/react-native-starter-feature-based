import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { TokenService } from './tokenService';
import { logger } from '../logger/Logger';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token);
    } else {
      reject(error);
    }
  });
  failedQueue = [];
};

export const attachInterceptors = (instance: AxiosInstance): void => {
  // ─── Request — inject Bearer token ──────────────────────────
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await TokenService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      logger.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error: AxiosError) => {
      logger.error('[API] Request error', error);
      return Promise.reject(error);
    },
  );

  // ─── Response — handle 401 + refresh ────────────────────────
  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = await TokenService.getRefreshToken();
          if (!refreshToken) {
            throw new Error('No refresh token');
          }

          const { data } = await instance.post<{
            accessToken: string;
            refreshToken: string;
          }>('/auth/refresh', { refreshToken });

          await TokenService.save({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });

          processQueue(null, data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          await TokenService.clear();
          logger.warn('[API] Session expired — tokens cleared');
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      const status = error.response?.status;
      const url = originalRequest?.url;
      logger.error(`[API] ${status} error on ${url}`, error.message);

      return Promise.reject(error);
    },
  );
};
