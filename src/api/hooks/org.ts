import { useQuery } from '@tanstack/react-query';
import { api } from '..';

export const useOrganization = ({ slug }: { slug: string | null }) => {
  return useQuery({
    queryKey: ['organization', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Slug is required');
      const response = await api
        .from('organization')
        .select('*, members:public_member( profile(*) )')
        .eq('slug', slug)
        .single();
      if (response.error) throw new Error(response.error.message);
      return {
        ...response.data,
        members: response.data.members.map((member) => member.profile),
      };
    },
    enabled: !!slug,
  });
};
