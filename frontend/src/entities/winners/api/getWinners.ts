import { axios } from '@/shared';
import { WinnerProps } from '../types';

const getWinnersController = new AbortController();

export const getWinners = async () => {
  const response = await axios.get<{ data: WinnerProps[] }>(
    `/v1/winners/get-winners`,
    {
      signal: getWinnersController.signal,
    }
  );

  return response.data;
};

export const getWinnersAbort = getWinnersController.abort;
