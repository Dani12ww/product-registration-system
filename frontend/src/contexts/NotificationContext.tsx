import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

interface NotificationContextProps {
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  return (
    <NotificationContext.Provider value={{ notifySuccess, notifyError }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
