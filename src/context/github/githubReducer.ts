import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  CLEAR_USERS,
} from '../types';
import { GithubUser, Repo } from '../../types';

export interface GithubState {
  users: GithubUser[];
  user: Partial<GithubUser>;
  repos: Repo[];
  loading: boolean;
}

export type GithubAction =
  | { type: typeof SEARCH_USERS; payload: GithubUser[] }
  | { type: typeof GET_USER; payload: GithubUser }
  | { type: typeof GET_REPOS; payload: Repo[] }
  | { type: typeof CLEAR_USERS }
  | { type: typeof SET_LOADING };

export default (state: GithubState, action: GithubAction): GithubState => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };

    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
