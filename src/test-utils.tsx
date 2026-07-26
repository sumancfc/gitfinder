import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './theme';
import { HistoryProvider } from './context/history/HistoryContext';
import AlertState from './context/alert/AlertState';

interface Options {
  route?: string;
}

export const renderWithProviders = (ui: ReactElement, { route = '/' }: Options = {}) => {
  // A fresh QueryClient per render — tests shouldn't share cache state with
  // each other, and disabling retries keeps failed-request tests fast
  // instead of waiting through retry backoff.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <HistoryProvider>
          <AlertState>
            <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
          </AlertState>
        </HistoryProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

// axe's color-contrast rule can't compute real styles under jsdom (no
// layout/rendering engine) and produces unreliable results there — contrast
// is verified separately against the live-rendered app instead.
export const axeOptions = {
  rules: { 'color-contrast': { enabled: false } },
};
