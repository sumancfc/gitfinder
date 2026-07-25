import React, { useContext } from 'react';
import { Alert as ChakraAlert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import AlertContext from '../../context/alert/alertContext';

const statusMap: Record<string, 'info' | 'warning' | 'success' | 'error'> = {
  light: 'warning',
  success: 'success',
  danger: 'error',
};

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;
  if (alert === null) return null;

  return (
    <ChakraAlert status={statusMap[alert.type] || 'info'} borderRadius='lg' mb={4}>
      <AlertIcon />
      <AlertDescription>{alert.msg}</AlertDescription>
    </ChakraAlert>
  );
};

export default Alert;
