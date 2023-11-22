import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '..';
import {
  type SignInWithOAuthCredentials,
  type SignInWithPasswordCredentials,
} from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { type Path } from '~/constants/paths';

export const useAuth = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const response = await api.auth.getSession();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
  });
};

export const useSignInWithPassword = (args: { redirectTo: Path }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (credentials: SignInWithPasswordCredentials) => {
      const response = await api.auth.signInWithPassword(credentials);
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['session'],
      });
      navigate(args.redirectTo);
    },
  });
};

export const useSignInWithOAuth = (args: { redirectTo: Path }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (credentials: SignInWithOAuthCredentials) => {
      const response = await api.auth.signInWithOAuth(credentials);
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['session'],
      });
      navigate(args.redirectTo);
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await api.auth.signOut();
      if (response.error) throw new Error(response.error.message);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['session'],
      });
    },
  });
};

export const useSignUp = (args: { redirectTo: Path }) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (
      credentials: SignInWithPasswordCredentials & {
        firstName: string;
        lastName: string;
        orgId?: number;
      },
    ) => {
      const response = await api.auth.signUp(credentials);
      if (response.error) throw new Error(response.error.message);
      if (response.data.user) {
        await api.from('profile').insert({
          id: response.data.user.id,
          first_name: credentials.firstName,
          last_name: credentials.lastName,
        });
        await api.from('preference').insert({
          id: response.data.user.id,
          active_organization_id: credentials.orgId,
        });
      }
      return response.data;
    },
    onSuccess: () => {
      navigate(args.redirectTo);
    },
  });
};
