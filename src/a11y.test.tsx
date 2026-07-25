import React from 'react';
import { Route } from 'react-router-dom';
import { axe } from 'jest-axe';
import axios from 'axios';
import { renderWithProviders, axeOptions } from './test-utils';
import Home from './components/pages/Home';
import About from './components/pages/About';
import User from './components/users/User';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('accessibility', () => {
  it('Home page has no axe violations', async () => {
    const { container } = renderWithProviders(<Home />);
    const results = await axe(container, axeOptions);
    expect(results).toHaveNoViolations();
  });

  it('About page has no axe violations', async () => {
    const { container } = renderWithProviders(<About />);
    const results = await axe(container, axeOptions);
    expect(results).toHaveNoViolations();
  });

  it('User profile page has no axe violations', async () => {
    mockedAxios.get.mockImplementation((url: string) => {
      if (url.includes('/repos')) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({
        data: {
          id: 1,
          login: 'octocat',
          avatar_url: 'https://example.com/avatar.png',
          html_url: 'https://github.com/octocat',
          name: 'The Octocat',
          followers: 10,
          following: 2,
          public_repos: 5,
          public_gists: 1,
        },
      });
    });

    const { container, findByText } = renderWithProviders(
      <Route path='/user/:login' component={User} />,
      { route: '/user/octocat' }
    );

    await findByText('The Octocat');

    const results = await axe(container, axeOptions);
    expect(results).toHaveNoViolations();
  });
});
