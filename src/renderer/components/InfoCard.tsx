import '../ScreenStyle.css';

export default function InfoCard(props: any) {
  return (
    <div className={'info-card'}>
      <h6>{props.header}</h6>
      <h3>{props.value}</h3>
    </div>
  );
}
