import { Box, Button, Modal, styled, Typography } from '@mui/material';
import React from 'react';

const Content = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 24;
  padding: 16px;
  border-radius: 8px;
  outline: none;
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

type Error = {
  message: string;
  title?: string;
};

type ContextType = {
  openError: (error: Error) => void;
};

const ErrorContext = React.createContext<ContextType>({
  openError: (error: Error) => {},
});

type Props = {
  children: React.ReactNode;
};

const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = React.useState<Error | undefined>();

  const open = (error: Error) => {
    setError(error);
  };

  const close = () => {
    setError(undefined);
  };

  return (
    <ErrorContext.Provider value={{ openError: open }}>
      {children}
      <Modal open={!!error} onClose={close}>
        <Content>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {error?.title ?? 'Nastala chyba'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {error?.message}
          </Typography>
          <ButtonWrapper>
            <Button variant="contained" color="error" onClick={close}>
              OK
            </Button>
          </ButtonWrapper>
        </Content>
      </Modal>
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;

export const useError = () => React.useContext(ErrorContext);
