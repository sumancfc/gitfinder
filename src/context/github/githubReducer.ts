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

export const HISTORY_LIMIT = 8;

export interface GithubState {
  users: GithubUser[];
  user: Partial<GithubUser>;
  repos: Repo[];
  loading: boolean;
  error: string | null;
  history: string[];
}

export type GithubAction =
  | { type: typeof SEARCH_USERS; payload: GithubUser[] }
  | { type: typeof GET_USER; payload: GithubUser }
  | { type: typeof GET_REPOS; payload: Repo[] }
  | { type: typeof CLEAR_USERS }
  | { type: typeof SET_LOADING }
  | { type: typeof SET_ERROR; payload: string }
  | { type: typeof ADD_TO_HISTORY; payload: string }
  | { type: typeof REMOVE_FROM_HISTORY; payload: string }
  | { type: typeof CLEAR_HISTORY };

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

    case ADD_TO_HISTORY: {
      const withoutExisting = state.history.filter(
        (entry) => entry.toLowerCase() !== action.payload.toLowerCase()
      );
      return {
        ...state,
        history: [action.payload, ...withoutExisting].slice(0, HISTORY_LIMIT),
      };
    }

    case REMOVE_FROM_HISTORY:
      return {
        ...state,
        history: state.history.filter(
          (entry) => entry.toLowerCase() !== action.payload.toLowerCase()
        ),
      };

    case CLEAR_HISTORY:
      return {
        ...state,
        history: [],
      };

    default:
      return state;
  }
};
