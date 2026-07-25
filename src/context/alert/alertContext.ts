import { createContext } from 'react';
import { Alert } from '../../types';

export interface AlertContextType {
  alert: Alert | null;
  setAlert: (msg: string, type: string) => void;
}

const alertContext = createContext<AlertContextType>({} as AlertContextType);

export default alertContext;
