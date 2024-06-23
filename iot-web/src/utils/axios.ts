import axios from 'axios';
import dayjs from 'dayjs';
import { setSession } from './auth';

const baseURL = "http://localhost:2000/"
const axiosInstance = axios.create({ baseURL, withCredentials: true });

let lastRefreshToken = dayjs().add(-1, 'd');

async function refreshToken() {
  const refreshPassInSeconds = dayjs().diff(lastRefreshToken, 'second');
  if (refreshPassInSeconds < 60) return;

  const response = await axios({
    baseURL,
    method: 'POST',
    url: `${baseURL}api/auth/refresh`,
    withCredentials: true,
  });

  if (response.status === 200 && response.data) {
    console.log('eretertwerw')
    lastRefreshToken = dayjs();
    const { accessTokenExpiresAt, refreshTokenExpiresAt } = response.data;
    setSession(accessTokenExpiresAt, refreshTokenExpiresAt);
  }

  return response;
}

axiosInstance.interceptors.request.use(async (config) => {
  if (!config.url || config.url.includes('/api/auth')) return config;
  await refreshToken();
  return config;
});

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => Promise.reject(error.response?.data ?? error)
);

export default axiosInstance;
