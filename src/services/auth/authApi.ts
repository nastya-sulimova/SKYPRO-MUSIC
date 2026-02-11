import axios from 'axios';
import { BASE_URL } from '../constants';

type authUserProps = {
  email: string;
  password: string;
};

type authUserReturn = {
  email: string;
  username: string;
  _id: number;
};

export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios.post(BASE_URL + '/user/login/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

type getTokenProps = {
  email: string;
  password: string;
};

type getTokenReturn = {
  refresh: string;
  access: string;
};

export const getToken = (data: getTokenProps): Promise<getTokenReturn> => {
  return axios
    .post(BASE_URL + '/user/token/', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((response) => response.data);
};

type refreshTokenReturn = {
  access: string;
};

export const refreshToken = (refresh: string): Promise<refreshTokenReturn> => {
  return axios
    .post(BASE_URL + '/user/token/refresh/', refresh, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((response) => response.data);
};

type regUserProps = {
  email: string;
  password: string;
  username: string;
};

type regUserReturn = {
  username: string;
  email: string;
  _id: number;
};

export const regUser = (data: regUserProps): Promise<regUserReturn> => {
  return axios.post(BASE_URL + '/user/signup/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
