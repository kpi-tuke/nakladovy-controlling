import { RootSelectors } from '@renderer/store/store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ActionCellRight, TableCell, TableHead, TableRow } from './Table';
import TableActionButton from './TableActionButton';
import TableSelect from './TableSelect';
import React from 'react';

const selectCol = [
  { value: 7, label: 'Priamy materiál' },
  { value: 8, label: 'Priame mzdy' },
  { value: 9, label: 'Ostatné priame náklady' },
  { value: 10, label: 'Výrobná réžia technologická' },
  { value: 11, label: 'Výrobná réžia všeobecná' },
  { value: 12, label: 'Správna réžia' },
  { value: 13, label: 'Odbytová réžia' },
  { value: 14, label: 'Zásobovacia réžia' },
  { value: 15, label: 'Dopravná réžia' },
];

type HeaderSelectProps = {
  selectors: RootSelectors;
  actions: any;
};

const HeaderSelect: React.FC<HeaderSelectProps> = ({ selectors, actions }) => {
  const headers = useAppSelector(selectors.headers);

  const dispatch = useAppDispatch();

  const addColumn = () => {
    dispatch(actions.addColumn());
  };

  const disableAddButton = headers.some((value) => !value.label);

  return (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => (
          <Select
            key={header.id}
            selectors={selectors}
            actions={actions}
            index={index}
          />
        ))}

        {headers.length < selectCol.length && (
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

export default HeaderSelect;

type SelectProps = {
  selectors: RootSelectors;
  actions: any;
  index: number;
};

const Select: React.FC<SelectProps> = React.memo(
  ({ selectors, actions, index }) => {
    const dispatch = useAppDispatch();

    const header = useAppSelector(selectors.selectHeaderByIndex(index));
    const headers = useAppSelector(selectors.headers);

    const handleChangeHeader = function (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) {
      dispatch(
        actions.setHeaderOnIndex({
          index,
          data: {
            id: header.id,
            value: event.target.value,
          },
        }),
      );
    };

    let availableHeadersOptions = selectCol
      .filter(
        (option: { value: number; label: string }) =>
          !headers.some((header) => header.label === option.label),
      )
      .map((option: any) => option.label);

    return (
      <TableCell>
        <TableSelect
          value={header.label}
          onChange={(e) => handleChangeHeader(e as any)}
          options={[...availableHeadersOptions, header.label].filter(
            (option) => !!option,
          )}
        />
      </TableCell>
    );
  },
);
