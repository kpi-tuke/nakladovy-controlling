import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { defaultState } from '../../store/rootReducer';
import groupedOptions from '../../chartOfAccounts';
import { RootState } from '../../store/store';

export default function ItemSelect({
  selector,
  analytic,
  actions,
}: {
  corner: string[];
  inputs: string[];
  selector: (state: RootState) => defaultState;
  analytic: boolean;
  actions: any;
}) {
  const { corner, items, accounts } = useAppSelector(selector);
  const dispatch = useAppDispatch();

  const handleChangeInput = function (e: any, idx: number) {
    dispatch(actions.setItemsOnIndex({ data: e.label || e.value, index: idx }));
    dispatch(actions.setValuesOnIndex({ data: e.value, index: idx }));
  };

  const handleChangeAccount = function (e: any, idx: number) {
    dispatch(actions.changeAccount({ data: e.value, index: idx }));
  };

  const addRow = () => {
    dispatch(actions.addRow());
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '0px solid black',
    }),
    menu: (provided: any) => ({
      ...provided,
      border: '0px solid black',
      borderRadius: 0,
    }),
  };

  let availableInputOptions = groupedOptions.map(
    (selection: { label: any; options: any[] }) => ({
      label: selection.label,
      options: selection.options.filter(
        (opt: any) => !items.includes(opt.label)
      ),
    })
  );

  return (
    <div className={'col-5'}>
      <table className={'table'} style={{ width: '100%' }}>
        <thead>
          <tr className={'table-head'}>
            <th className={'table-corner'}>{corner}</th>
            {analytic && <th className={'table-analytic'}>Analytický účet</th>}
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
                  <Select
                    styles={customStyles}
                    value={{ label: value }}
                    options={availableInputOptions}
                    onChange={(e) => handleChangeInput(e, row)}
                  />
                </td>
                {analytic && (
                  <td
                    className={'table-cell-analytic'}
                    style={{
                      borderBottomColor:
                        row === items.length - 1 ? '#65c565' : 'lightgray',
                    }}
                  >
                    <input
                      className={'table-input'}
                      type="text"
                      defaultValue={accounts[row]}
                      onBlur={(e) => handleChangeAccount(e.target, row)}
                    />
                  </td>
                )}
              </tr>
            );
          })}

          <tr>
            <td
              colSpan={2}
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
