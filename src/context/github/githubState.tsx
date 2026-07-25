import React, { useReducer, ReactNode } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer, { GithubState as GithubStateType } from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  SET_ERROR,
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

const GithubState = (props: Props) => {
  const initialState: GithubStateType = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

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

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        error: state.error,
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
