import { useQuery } from '@tanstack/react-query';
import { api } from '..';

export const useMemberships = () => {
  return useQuery({
    queryKey: ['memberships'],
    queryFn: async () => {
      const response = await api
        .from('membership')
        .select(`*, organization (*)`);
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
  });
};
