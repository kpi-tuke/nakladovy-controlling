export default function HeaderBar(props: any) {
  return (
    <div
      className={'bg-primary p-2'}
      style={{ position: 'fixed', width: '100%', zIndex: 2 }}
    >
      <div className={'caption text-light bold'} style={{ fontSize: 30 }}>
        {props.title}
      </div>
    </div>
  );
}
