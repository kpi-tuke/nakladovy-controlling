import { useSelector } from 'react-redux';
import TextArea from '../components/Textarea';
import { RootSelectors } from '../store/store';
import withTable from '../components/tables/HOCTable';
import Page from '@renderer/components/layout/Page';
import PageContent from '@renderer/components/layout/PageContent';
import Spacer from '@renderer/components/Spacer';
import { useAppDispatch } from '@renderer/store/hooks';
import { styled, Typography } from '@mui/material';
import { routes } from '@renderer/routes';

const PrintPageTitle = styled(Typography)`
  font-weight: 700;
  font-size: 36px;
  color: ${({ theme }) => theme.palette.primary.main};
  text-align: center;
  width: 100%;
`;

export default function withAnalysis(
  selectors: RootSelectors,
  actions: any,
  TableItems: (props: any) => JSX.Element,
  TableHeaders: (props: any) => JSX.Element,
  Result: () => JSX.Element,
  routeName: string,
) {
  return () => {
    const text = useSelector(selectors.text);

    const dispatch = useAppDispatch();

    const Table: () => JSX.Element = withTable(
      TableItems,
      TableHeaders,
      selectors,
      actions,
    );

    const title = routes[routeName].title;

    return (
      <Page id={routeName.replace('/', '')}>
        <PageContent>
          <PrintPageTitle className="hideInScreen page-print-title">
            {title}
          </PrintPageTitle>
          <Table />
          <Result />
          <Spacer height={20} hideInPrint />
          <div className="new-page"></div>
          <TextArea
            defaultValue={text}
            onChangeDebounced={(value) => {
              dispatch(actions.changeText(value));
            }}
          />
        </PageContent>
      </Page>
    );
  };
}
