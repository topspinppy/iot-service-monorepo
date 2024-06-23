import dayjs from 'dayjs';
import axios from './axios';
// utils


const ONE_MINUTE = 60 * 1000;
const REFRESH_BEFORE_TIMEOUT = 2 * ONE_MINUTE;

const isValidToken = (): boolean => {
  const accessTokenExpires = localStorage.getItem('accessTokenExpiresAt');

  if (!accessTokenExpires) {
    return false;
  }

  const accessTokenExpiresAt = dayjs(accessTokenExpires);
  const validToken = accessTokenExpiresAt.isAfter(dayjs());
  if (validToken) {
    const refreshTokenExpires = localStorage.getItem('refreshTokenExpiresAt');
    const refreshTokenExpiresAt = dayjs(refreshTokenExpires ?? accessTokenExpires);

    setSession(accessTokenExpiresAt.toDate(), refreshTokenExpiresAt.toDate());
  }

  return validToken;
};

const handleTokenExpired = (expireInMilliseconds: number) => {
  let expiredTimer = 0;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = expireInMilliseconds - currentTime - REFRESH_BEFORE_TIMEOUT;

  expiredTimer = window.setTimeout(async () => {
    await refreshToken();
  }, timeLeft);
};

const refreshToken = async (): Promise<void> => {
  try {
    const response = await axios.post(process.env['API_AUTH_REFRESH'] || '');
    const { accessTokenExpiresAt, refreshTokenExpiresAt } = response.data;
    setSession(accessTokenExpiresAt, refreshTokenExpiresAt);
  } catch (error) {
    //
  }
};

const setSession = (accessTokenExpiresAt: Date | null = null, refreshTokenExpiresAt: Date | null = null) => {
  if (accessTokenExpiresAt) {
    const accessTokenExpiredDate = dayjs(accessTokenExpiresAt);
    localStorage.setItem('accessTokenExpiresAt', accessTokenExpiredDate.toISOString());
    const expireInMilliseconds = accessTokenExpiredDate.valueOf();
    handleTokenExpired(expireInMilliseconds);
  } else {
    localStorage.removeItem('accessTokenExpiresAt');
  }

  if (refreshTokenExpiresAt) {
    const refreshTokenExpiredDate = dayjs(refreshTokenExpiresAt);
    localStorage.setItem('refreshTokenExpiresAt', refreshTokenExpiredDate.toISOString());
  } else {
    localStorage.removeItem('refreshTokenExpiresAt');
  }
};

export { isValidToken, setSession };
