import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '..';
import { usePreference } from './user';
import { useAuth } from './auth';

export const useSetActiveOrganization = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  return useMutation({
    mutationFn: async (args: { organizationId: number }) => {
      if (!auth.data?.session?.user.id) throw new Error('User not logged in');
      const response = await api
        .from('preference')
        .update({ active_organization_id: args.organizationId })
        .eq('id', auth.data?.session?.user.id)
        .single();
      if (response.error) throw new Error(response.error.message);
      return { organizationId: args.organizationId };
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ['preference'],
      });
      queryClient.refetchQueries({
        queryKey: ['organization', data.organizationId],
      });
    },
  });
};

export const useOrganization = () => {
  const preference = usePreference();
  const organizationId = preference.data?.active_organization_id;
  return useQuery({
    queryKey: ['organization', organizationId],
    queryFn: async () => {
      if (!organizationId) return null;
      const response = await api
        .from('organization')
        .select('*')
        .eq('id', organizationId)
        .single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
    enabled: !!organizationId,
  });
};
