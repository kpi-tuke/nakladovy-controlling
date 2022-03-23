import '../ScreenStyle.css';

export default function HeaderBar(props: any) {
  return (
    <div
      className={'header-bar'}
    >
      <div className={"header-title"}>
        {props.title}
      </div>
    </div>
  );
}
