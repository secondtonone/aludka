import { queryClient } from '@/shared';
import { ContractProps } from '../types';

export const updateContract = (data: Partial<ContractProps>) =>
  queryClient.setQueryData(
    ['contract'],
    (oldData: { data: ContractProps }) => ({
      data: {
        ...oldData.data,
        ...data,
      },
    })
  );
