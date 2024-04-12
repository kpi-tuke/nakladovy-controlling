import {
  IconButton,
  Snackbar,
  SnackbarContent
} from '@mui/material';
import React, {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react';
import CloseIcon from '@mui/icons-material/Close';

type ContextType = {
  open: (message: string) => void;
}

const SaveContext = createContext<ContextType>({
  open: () => {
  }
});

type Props = {
  children: ReactNode;
};

const SnackbarProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const open = (message: string) => {
    setIsOpen(true);
    setMessage(message);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessage(undefined);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <SaveContext.Provider
      value={{
        open
      }}
    >
      {children}
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </SaveContext.Provider>
  );
};

export default SnackbarProvider;

export const useSnackbar = () => useContext(SaveContext);
