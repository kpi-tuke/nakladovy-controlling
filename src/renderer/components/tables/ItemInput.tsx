import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { defaultState } from '../../store/rootReducer';
import { RootState } from '../../store/store';

export default function ItemInput({
  selector,
  actions,
}: {
  corner: string[];
  inputs: string[];
  selector: (state: RootState) => defaultState;
  actions: any;
}) {
  const { corner, items } = useAppSelector(selector);
  const dispatch = useAppDispatch();

  const handleChangeInput = function (e: any, idx: number) {
    dispatch(actions.setItemsOnIndex({ data: e.label || e.value, index: idx }));
    dispatch(actions.setValuesOnIndex({ data: e.value, index: idx }));
  };

  const addRow = () => {
    dispatch(actions.addRow());
  };

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
                  style={{
                    borderBottomColor:
                      row === items.length - 1 ? '#65c565' : 'lightgray',
                  }}
                  key={value + row.toString()}
                >
                  <input
                    className={'table-input'}
                    type="text"
                    defaultValue={value}
                    onBlur={(e) => handleChangeInput(e.target, row)}
                  />
                </td>
              </tr>
            );
          })}

          <tr>
            <td
              className={'add-cell'}
              style={{ textAlign: 'center' }}
              onClick={addRow}
            >
              +
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
