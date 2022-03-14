export default function InfoCard(props: any) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: 25,
        boxShadow: '0px 0px 10px lightgray',
      }}
    >
      <h6 className={'bold'}>{props.header}</h6>
      <h3 className={'card-title bold text-' + props.color}>{props.value}</h3>
    </div>
  );
}
