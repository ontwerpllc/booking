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

export const usePreference = () => {
  return useQuery({
    queryKey: ['preference'],
    queryFn: async () => {
      const response = await api.from('preference').select('*').single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.from('profile').select('*').single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
  });
};
