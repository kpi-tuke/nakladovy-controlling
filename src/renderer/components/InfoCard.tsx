import '../ScreenStyle.css';

export default function InfoCard(props: any) {
  return (
    <div className={'info-card'}>
      <h2 className={"info-title"}>{props.header}:</h2>
      <p className={"info-value"}>{props.value}</p>
    </div>
  );
}
