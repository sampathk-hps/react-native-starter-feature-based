import axiosInstance from '../../../core/api/axiosInstance';
import { LoginRequest, LoginResponse } from '../types';

export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>(
      '/auth/login',
      payload,
    );
    return data;
  },

  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>('/auth/refresh', {
      refreshToken,
    });
    return data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },
};
