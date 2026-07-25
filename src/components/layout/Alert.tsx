import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;
  if (alert === null) return null;
  return <div className={`alert alert-${alert.type}`}>{alert.msg}</div>;
};

export default Alert;
