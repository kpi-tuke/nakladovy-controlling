import { RootSelectors } from '@renderer/store/store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ActionCellRight, TableCell, TableHead, TableRow } from './Table';
import TableActionButton from './TableActionButton';
import TableInput from './TableInput';
import React, { forwardRef, memo, useEffect, useRef } from 'react';

type HeaderInputProps = {
  selectors: RootSelectors;
  actions: any;
};

const HeaderInput: React.FC<HeaderInputProps> = ({ selectors, actions }) => {
  const dispatch = useAppDispatch();
  const headers = useAppSelector(selectors.headers);
  const dynCols = useAppSelector(selectors.dynCols);

  const inputRef = useRef<HTMLInputElement>(null);
  const prevHeadersLength = useRef<number>(headers?.length || 0);

  const addColumn = () => {
    dispatch(actions.addColumn());
  };

  const disableAddButton = headers.some((header) => !header.label);

  useEffect(() => {
    const currentHeadersLength = headers.length || 0;

    if (currentHeadersLength > prevHeadersLength.current) {
      inputRef.current?.focus();
    }

    prevHeadersLength.current = currentHeadersLength;
  }, [headers]);

  return (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => (
          <Input
            ref={index === headers.length - 1 ? inputRef : null}
            key={header.id}
            actions={actions}
            index={index}
            selectors={selectors}
          />
        ))}

        {dynCols && (
          <ActionCellRight $topBorder={false}>
            <TableActionButton
              buttonType="add"
              onClick={addColumn}
              disabled={disableAddButton}
            />
          </ActionCellRight>
        )}
      </TableRow>
    </TableHead>
  );
};

export default HeaderInput;

type InputProps = {
  selectors: RootSelectors;
  actions: any;
  index: number;
  ref: any;
};

const Input: React.FC<InputProps> = memo(
  forwardRef(({ selectors, actions, index }, ref) => {
    const dispatch = useAppDispatch();

    const header = useAppSelector(selectors.selectHeaderByIndex(index));

    const handleChangeHeader = (value: string, index: number) => {
      dispatch(
        actions.setHeaderOnIndex({
          index,
          data: {
            id: header.id,
            value,
          },
        }),
      );
    };

    return (
      <TableCell>
        <TableInput
          ref={ref as any}
          defaultValue={header.label}
          onChange={(e) => handleChangeHeader(e.target.value, index)}
        />
      </TableCell>
    );
  }),
);
