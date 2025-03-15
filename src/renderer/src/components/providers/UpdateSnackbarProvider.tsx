import { Alert, Snackbar, Typography } from '@mui/material';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import LinearProgressWithLabel from '../LinearProgressWithLabel';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';

type ContextType = {
  open: () => void;
  close: () => void;
  updateProgress: (progress: number) => void;
};

const UpdateContext = createContext<ContextType>({
  open: () => {},
  close: () => {},
  updateProgress: () => {},
});

type Props = {
  children: ReactNode;
};

const UpdateSnackbarProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const updateProgress = (value: number) => {
    setProgress(value);
  };

  return (
    <UpdateContext.Provider
      value={{
        open,
        close,
        updateProgress,
      }}
    >
      {children}
      <Snackbar
        open={isOpen}
        onClose={close}
        message="testik"
        children={
          <Alert
            icon={<BrowserUpdatedIcon fontSize="inherit" />}
            variant="filled"
            severity="info"
          >
            <Typography
              variant="body1"
              sx={{
                mb: 1,
              }}
            >
              Sťahovanie aktualizácie
            </Typography>
            <LinearProgressWithLabel value={progress} />
          </Alert>
        }
      />
    </UpdateContext.Provider>
  );
};

export default UpdateSnackbarProvider;

export const useUpdateSnackbar = () => useContext(UpdateContext);
