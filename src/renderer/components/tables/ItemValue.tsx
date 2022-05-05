import { useAppSelector } from '../../store/hooks';
import { defaultState } from '../../store/rootReducer';
import { RootState } from '../../store/store';

export default function ItemValue({
  selector,
}: {
  selector: (state: RootState) => defaultState;
}) {
  const { corner, items } = useAppSelector(selector);

  return (
    <div className={'col-5'}>
      <table className={'table'} style={{ width: '100%' }}>
        <thead>
          <tr className={'table-head'}>
            <th className={'table-corner'}>{corner}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((value: string, row: number) => {
            return (
              <tr key={row}>
                <td
                  className={'table-cell'}
                  key={value + row.toString()}
                >
                  {value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
