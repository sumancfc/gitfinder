import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // repeat searches/profile views within 60s hit cache, not the network
      retry: 1,
    },
  },
});
