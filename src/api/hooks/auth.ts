import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '..';
import {
  type SignInWithOAuthCredentials,
  type SignInWithPasswordCredentials,
} from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuth = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const watch = api.auth.onAuthStateChange((event) => {
      if (
        event === 'SIGNED_IN' ||
        event === 'TOKEN_REFRESHED' ||
        event === 'SIGNED_OUT'
      ) {
        queryClient.invalidateQueries({ queryKey: ['session'] });
        queryClient.invalidateQueries({ queryKey: ['user'] });
      } else if (event === 'USER_UPDATED') {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    });
    return () => {
      watch.data.subscription.unsubscribe();
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const response = await api.auth.getSession();
      const preferences = await api.from('preference').select('*').single();
      if (response.error) throw new Error(response.error.message);
      return { ...response.data.session, preferences: preferences.data };
    },
  });
};

export const useSignInWithPassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (
      credentials: SignInWithPasswordCredentials & {
        extra?: {
          redirectTo?: string;
        };
      },
    ) => {
      const response = await api.auth.signInWithPassword(credentials);
      if (response.error) throw new Error(response.error.message);
      return { ...response.data, extra: credentials.extra };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['session'], data.session);
      queryClient.setQueryData(['user'], data.user);
      if (data.extra?.redirectTo) navigate(data.extra?.redirectTo);
    },
  });
};

export const useSignInWithOAuth = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (
      credentials: SignInWithOAuthCredentials & {
        extra?: {
          redirectTo?: string;
        };
      },
    ) => {
      const response = await api.auth.signInWithOAuth(credentials);
      if (response.error) throw new Error(response.error.message);
      return { ...response.data, extra: credentials.extra };
    },
    onSuccess: (data) => {
      if (data.extra?.redirectTo) navigate(data.extra?.redirectTo);
    },
  });
};

export const useSignOut = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (args: {
      extra?: {
        redirectTo?: string;
      };
    }) => {
      const response = await api.auth.signOut();
      if (response.error) throw new Error(response.error.message);
      return { extra: args?.extra };
    },
    onSuccess: (data) => {
      if (data.extra?.redirectTo) navigate(data.extra?.redirectTo);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (
      credentials: SignInWithPasswordCredentials & {
        firstName: string;
        lastName: string;
        extra?: {
          redirectTo?: string;
        };
      },
    ) => {
      const response = await api.auth.signUp(credentials);
      if (response.error) throw new Error(response.error.message);
      if (response.data.user) {
        await api
          .from('profile')
          .insert({
            id: response.data.user.id,
            first_name: credentials.firstName,
            last_name: credentials.lastName,
          })
          .throwOnError();
        await api
          .from('preference')
          .insert({ id: response.data.user.id })
          .throwOnError();
      }
      return { ...response.data, extra: credentials.extra };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['session'], data.session);
      queryClient.setQueryData(['user'], data.user);
      if (data.extra?.redirectTo) navigate(data.extra?.redirectTo);
    },
  });
};
