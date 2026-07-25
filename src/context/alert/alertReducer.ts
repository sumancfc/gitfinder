import { SET_ALERT, REMOVE_ALERT } from '../types';
import { Alert } from '../../types';

export type AlertAction =
  | { type: typeof SET_ALERT; payload: Alert }
  | { type: typeof REMOVE_ALERT };

export default (state: Alert | null, action: AlertAction): Alert | null => {
  switch (action.type) {
    case SET_ALERT:
      return action.payload;
    case REMOVE_ALERT:
      return null;
    default:
      return state;
  }
};
