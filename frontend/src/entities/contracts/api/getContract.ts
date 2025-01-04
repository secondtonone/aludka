import { axios } from '@/shared';
import type { ContractProps } from '../types';

const getContractController = new AbortController();

export const getContract = async () => {
  const response = await axios.get<{ data: ContractProps }>(
    `/v1/contracts/get-contract`,
    {
      signal: getContractController.signal,
    }
  );

  return response.data;
};

export const getContractAbort = getContractController.abort;
