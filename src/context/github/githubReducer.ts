import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  SET_ERROR,
  CLEAR_USERS,
} from '../types';
import { GithubUser, Repo } from '../../types';

export interface GithubState {
  users: GithubUser[];
  user: Partial<GithubUser>;
  repos: Repo[];
  loading: boolean;
  error: string | null;
}

export type GithubAction =
  | { type: typeof SEARCH_USERS; payload: GithubUser[] }
  | { type: typeof GET_USER; payload: GithubUser }
  | { type: typeof GET_REPOS; payload: Repo[] }
  | { type: typeof CLEAR_USERS }
  | { type: typeof SET_LOADING }
  | { type: typeof SET_ERROR; payload: string };

export default (state: GithubState, action: GithubAction): GithubState => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
        error: null,
      };

    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
        error: null,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
