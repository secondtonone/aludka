import { useQuery } from '@tanstack/react-query';
import { getWinners } from '../api/getWinners';

export function useWinners(enabled = true) {
  return useQuery({
    queryKey: ['winners'],
    queryFn: getWinners,
    select: (res) => res.data,
    enabled,
  });
}
