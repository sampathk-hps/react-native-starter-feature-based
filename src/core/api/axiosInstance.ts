import axios from 'axios';
import { EnvironmentConfig } from '../../../environment.config';
import { attachInterceptors } from './interceptors';

const axiosInstance = axios.create({
  baseURL: EnvironmentConfig.baseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

attachInterceptors(axiosInstance);

export default axiosInstance;
