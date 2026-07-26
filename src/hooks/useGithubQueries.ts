import { useQuery } from '@tanstack/react-query';
import { searchGithubUsers, getGithubUser, getGithubUserRepos } from '../api/github';
import { GithubUser, Repo } from '../types';
import { useSearchHistory } from '../context/history/HistoryContext';

// Each hook below maps 1:1 to what used to be a method on GithubContext
// (searchUsers, getUser, getUserRepos). The differences from the old version:
//
// - No manual loading/error state — query.isLoading / query.error come for free.
// - Cached by queryKey. Searching "octocat" twice within staleTime (60s, set
//   in queryClient.ts) resolves the second time from cache, no network call.
// - Each hook is independent, so a stale/failed repo fetch doesn't block the
//   user profile from rendering, and vice versa (previously one `loading`
//   flag covered both).

export function useSearchUsers(query: string) {
  const { addToHistory } = useSearchHistory();

  return useQuery<GithubUser[], Error>({
    queryKey: ['users', 'search', query],
    queryFn: () => searchGithubUsers(query),
    enabled: query.trim().length > 0,
    onSuccess: () => addToHistory(query),
  });
}

export function useGithubUser(username: string | undefined) {
  const { addToHistory } = useSearchHistory();

  return useQuery<GithubUser, Error>({
    queryKey: ['user', username],
    queryFn: () => getGithubUser(username as string),
    enabled: Boolean(username),
    onSuccess: () => {
      if (username) addToHistory(username);
    },
  });
}

export function useGithubUserRepos(username: string | undefined) {
  return useQuery<Repo[], Error>({
    queryKey: ['repos', username],
    queryFn: () => getGithubUserRepos(username as string),
    enabled: Boolean(username),
  });
}
