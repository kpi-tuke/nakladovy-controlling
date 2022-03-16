import '../App.css';

export default function Page(Task: any) {
  return (
    <div style={{ borderWidth: 5 }}>
      <div className={'row'}>
        <div
          className={'col-2'}
          style={{
            backgroundColor: 'white',
            boxShadow: '5px 60px 10px lightgray',
            zIndex: 1,
          }}
        >
          <h3>Menu</h3>
        </div>
        <div
          className={"col-10"}
          style={{backgroundColor: '#f0f2f5', paddingLeft: 0}}
        >
          <Task/>
        </div>
      </div>
    </div>
  );
}
