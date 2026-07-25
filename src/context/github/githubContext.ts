import { createContext } from 'react';
import { GithubUser, Repo } from '../../types';

export interface GithubContextType {
  users: GithubUser[];
  user: Partial<GithubUser>;
  repos: Repo[];
  loading: boolean;
  error: string | null;
  searchUsers: (text: string) => Promise<void>;
  getUser: (username: string) => Promise<void>;
  getUserRepos: (username: string) => Promise<void>;
  clearUsers: () => void;
}

const githubContext = createContext<GithubContextType>({} as GithubContextType);

export default githubContext;
