const CustomLabel = (props) => {
  return (
    <g>
      <rect
        x={props.viewBox.x}
        y={props.viewBox.y}
        fill={props.fill}
        width={props.customWidth}
        height={20}
      />
      <text
        x={props.viewBox.x}
        y={props.viewBox.y}
        fill={'#fff'}
        dy={14}
        dx={8}
        fontSize={14}
      >
        {props.value}
      </text>
    </g>
  );
};

export default CustomLabel;
