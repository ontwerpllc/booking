import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useMemo } from 'react';
import { queryClient } from '~/api/query-client';

export type ApiProviderProps = {
  children: React.ReactNode;
};

export const ApiProvider = ({ children }: ApiProviderProps) => {
  return (
    <QueryClientProvider client={useMemo(() => queryClient, [])}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
