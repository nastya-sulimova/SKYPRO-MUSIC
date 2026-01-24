import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};

export const getSelection = (
  id: string,
): Promise<{ items: number[]; name: string }> => {
  return axios(BASE_URL + `/catalog/selection/${id}/`).then((res) => {
    return {
      items: res.data.data.items,
      name: res.data.data.name,
    };
  });
};
