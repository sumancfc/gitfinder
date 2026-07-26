import axios from 'axios';
import { GithubUser, Repo } from '../types';

interface AxiosErrorLike {
  isAxiosError: true;
  response?: { status?: number };
}

const isAxiosErrorLike = (err: unknown): err is AxiosErrorLike =>
  typeof err === 'object' && err !== null && (err as { isAxiosError?: unknown }).isAxiosError === true;

const getErrorMessage = (err: unknown): string => {
  if (isAxiosErrorLike(err)) {
    const status = err.response?.status;
    if (status === 404) return 'That GitHub user could not be found.';
    if (status === 403) {
      return "GitHub's API rate limit has been reached. Please try again in a little while.";
    }
    if (!err.response) return 'Network error — please check your connection and try again.';
  }
  return 'Something went wrong. Please try again.';
};

// client_id/client_secret as query params for unauthenticated app identification
// were deprecated by GitHub in favor of a token in the Authorization header —
// kept as-is here to match existing behavior, called out in the README.
const authParams = `client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

// These three functions are exactly what githubState.tsx used to do inline —
// just the axios call, with no dispatch, no loading flag, no try/catch state
// update. TanStack Query owns all of that now; these only need to resolve
// with data or throw.

export async function searchGithubUsers(query: string): Promise<GithubUser[]> {
  try {
    const res = await axios.get<{ items: GithubUser[] }>(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}&${authParams}`
    );
    return res.data.items;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getGithubUser(username: string): Promise<GithubUser> {
  try {
    const res = await axios.get<GithubUser>(`https://api.github.com/users/${username}?${authParams}`);
    return res.data;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getGithubUserRepos(username: string): Promise<Repo[]> {
  try {
    const res = await axios.get<Repo[]>(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${authParams}`
    );
    return res.data;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}
