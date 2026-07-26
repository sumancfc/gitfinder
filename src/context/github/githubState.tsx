import React, { useReducer, useEffect, ReactNode } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer, { GithubState as GithubStateType } from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  SET_ERROR,
  ADD_TO_HISTORY,
  REMOVE_FROM_HISTORY,
  CLEAR_HISTORY,
  CLEAR_USERS,
} from '../types';
import { GithubUser, Repo } from '../../types';

interface Props {
  children: ReactNode;
}

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

const HISTORY_STORAGE_KEY = 'hublens_search_history';

const loadHistory = (): string[] => {
  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((entry) => typeof entry === 'string') : [];
  } catch {
    return [];
  }
};

const GithubState = (props: Props) => {
  const initialState: GithubStateType = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    error: null,
    history: loadHistory(),
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(state.history));
    } catch {
      // localStorage may be unavailable (e.g. private browsing); history just
      // won't persist across sessions in that case.
    }
  }, [state.history]);

  //SEARCH_USER
  const searchUsers = async (text: string) => {
    setLoading();
    try {
      const res = await axios.get<{ items: GithubUser[] }>(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
      );

      dispatch({
        type: SEARCH_USERS,
        payload: res.data.items,
      });
      addToHistory(text);
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: getErrorMessage(err) });
    }
  };

  //GET_USER
  const getUser = async (username: string) => {
    setLoading();

    try {
      const res = await axios.get<GithubUser>(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
      );

      dispatch({
        type: GET_USER,
        payload: res.data,
      });
      addToHistory(username);
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: getErrorMessage(err) });
    }
  };

  //GET_REPOS
  const getUserRepos = async (username: string) => {
    setLoading();

    try {
      const res = await axios.get<Repo[]>(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
      );

      dispatch({
        type: GET_REPOS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: getErrorMessage(err) });
    }
  };

  //CLEAR_USERS
  const clearUsers = () =>
    dispatch({
      type: CLEAR_USERS,
    });

  //SET_LOADING
  const setLoading = () => dispatch({ type: SET_LOADING });

  //ADD_TO_HISTORY
  const addToHistory = (username: string) =>
    dispatch({ type: ADD_TO_HISTORY, payload: username });

  //REMOVE_FROM_HISTORY
  const removeFromHistory = (username: string) =>
    dispatch({ type: REMOVE_FROM_HISTORY, payload: username });

  //CLEAR_HISTORY
  const clearHistory = () => dispatch({ type: CLEAR_HISTORY });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        error: state.error,
        history: state.history,
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
        addToHistory,
        removeFromHistory,
        clearHistory,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
