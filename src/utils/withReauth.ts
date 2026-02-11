import { refreshToken } from '@/services/auth/authApi';
import { setAccessToken } from '@/store/features/authSlice';
import { AppDispatch } from '@/store/store';
import { AxiosError } from 'axios';

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  currentAccess: string,
  refresh: string,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    return await apiFunction(currentAccess);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401 && refresh) {
      try {
        const newAccessToken = await refreshToken(refresh);
        dispatch(setAccessToken(newAccessToken.access));
        return await apiFunction(newAccessToken.access);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    throw error;
  }
};
