import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import theme from './theme';
import GithubState from './context/github/githubState';
import AlertState from './context/alert/AlertState';

interface Options {
  route?: string;
}

export const renderWithProviders = (ui: ReactElement, { route = '/' }: Options = {}) => {
  return render(
    <ChakraProvider theme={theme}>
      <GithubState>
        <AlertState>
          <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </AlertState>
      </GithubState>
    </ChakraProvider>
  );
};

// axe's color-contrast rule can't compute real styles under jsdom (no
// layout/rendering engine) and produces unreliable results there — contrast
// is verified separately against the live-rendered app instead.
export const axeOptions = {
  rules: { 'color-contrast': { enabled: false } },
};
