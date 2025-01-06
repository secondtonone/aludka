import { useQuery } from '@tanstack/react-query';
import { getContract } from '../api/getContract';

export function useContract(enabled = true) {
  return useQuery({
    queryKey: ['contract'],
    queryFn: getContract,
    select: (res) => res.data,
    enabled,
    refetchInterval: 1000 * 60 * 1,
  });
}
