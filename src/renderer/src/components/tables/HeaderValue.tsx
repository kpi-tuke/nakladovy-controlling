import { Typography } from '@mui/material';
import { ActionCellRight, TableCell, TableHead, TableRow } from './Table';
import { RootSelectors } from '@renderer/store/store';
import { useAppDispatch, useAppSelector } from '@renderer/store/hooks';
import TableActionButton from './TableActionButton';

type HeaderValueProps = {
  selectors: RootSelectors;
  actions: any;
};

const HeaderValue: React.FC<HeaderValueProps> = ({ selectors, actions }) => {
  const dispatch = useAppDispatch();

  const headers = useAppSelector(selectors.headers);
  const dynCols = useAppSelector(selectors.dynCols);

  const addColumn = () => {
    dispatch(actions.addColumn());
  };

  const disableAddButton = headers.some((header) => !header.label);

  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell
            key={header.id}
            sx={{
              minWidth: '12.75vw',
              maxWidth: '12.75vw',
              width: '12.75vw',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              dangerouslySetInnerHTML={{ __html: header.label }}
            />
          </TableCell>
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

export default HeaderValue;
