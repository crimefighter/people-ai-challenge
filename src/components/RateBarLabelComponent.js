import React from 'react';
import {round} from 'lodash';

function RateBarLabelComponent(props) {
  return (
    <text
      x={props.x}
      y={props.y}
      fill={props.payload.value < props.mean ? '#ffcccb' : '#c9fdc9'}
      textAnchor={props.textAnchor}
    >{round(props.payload.value, 3)}</text>
  );
}

export default RateBarLabelComponent;
