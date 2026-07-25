import React, { useReducer, ReactNode } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import { Alert } from '../../types';

interface Props {
  children: ReactNode;
}

const AlertState = (props: Props) => {
  const initialState: Alert | null = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Set alert
  const setAlert = (msg: string, type: string) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 4000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
