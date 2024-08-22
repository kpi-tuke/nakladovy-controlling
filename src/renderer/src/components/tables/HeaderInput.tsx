import { RootSelectors } from '@renderer/store/store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ActionCellRight, TableCell, TableHead, TableRow } from './Table';
import TableActionButton from './TableActionButton';
import TableInput from './TableInput';
import React from 'react';

type Props = {
  selectors: RootSelectors;
  actions: any;
};

const HeaderInput: React.FC<Props> = ({ selectors, actions }) => {
  const dispatch = useAppDispatch();

  const addColumn = () => {
    dispatch(actions.addColumn());
  };

  const headers = useAppSelector(selectors.headers);

  const disableAddButton = headers.some((value) => !value);

  // rerender headers only if it's length changes
  const headersArray = React.useMemo(() => {
    return headers.map((_, index) => (
      <Input
        key={index}
        actions={actions}
        index={index}
        selectors={selectors}
      />
    ));
  }, [headers.length]);

  return (
    <TableHead>
      <TableRow>
        {headersArray}
        {
          <ActionCellRight $topBorder={false}>
            <TableActionButton
              buttonType="add"
              onClick={addColumn}
              disabled={disableAddButton}
            />
          </ActionCellRight>
        }
      </TableRow>
    </TableHead>
  );
};

export default HeaderInput;

type InputProps = {
  selectors: RootSelectors;
  actions: any;
  index: number;
};

const Input: React.FC<InputProps> = React.memo(
  ({ actions, index, selectors }) => {
    const dispatch = useAppDispatch();

    const header = useAppSelector(selectors.selectHeaderByIndex(index));

    const handleChangeHeader = (value: string, index: number) => {
      dispatch(actions.setHeadersOnIndex({ data: value, index }));
    };

    return (
      <TableCell>
        <TableInput
          defaultValue={header.label}
          onChange={(e) => handleChangeHeader(e.target.value, index)}
        />
      </TableCell>
    );
  },
);
