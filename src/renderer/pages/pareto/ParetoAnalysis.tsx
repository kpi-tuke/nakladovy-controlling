import TableDynamic from '../../components/TableDynamic';
import ParetoResult from './ParetoResult';
import HeaderBar from '../../components/HeaderBar';
import {useAppSelector} from 'renderer/store/hooks';
import TextField from '../../components/TextField';
import {paretoActions, selectPareto} from "./paretoSlice";
import Title from "../../components/Title";

export default function ParetoAnalysis(props:any) {
  const { corner, headers, values, items, data, text} = useAppSelector(selectPareto);


  return (
    <div className={'task-container'}>
      {!props.hideHeader && <HeaderBar id={"6"} title={'Pareto analýza nákladov'}  back={"taskselect"}/>}

      <Title/>

      <TableDynamic
        corner={corner}
        headerType={'textCVP'}
        header={headers}
        inputType={'input'}
        inputs={items}
        data={data}
        values={values}
        rows={7}
        cols={2}
        dynRows={true}
        dynCols={false}
        actions={paretoActions}
      />
      <ParetoResult/>

      <TextField text={text} action={paretoActions.changeText}/>
    </div>
  );
}
