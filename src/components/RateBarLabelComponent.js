import React from 'react';
import {round} from 'lodash';
import {Text} from 'recharts';

function RateBarLabelComponent(props) {
  let mobile = window.innerWidth < 960;
  return (
    <Text
      x={props.x}
      y={props.y}
      angle={mobile ? 270 : 0}
      fill={props.payload.value < props.mean ? '#ffcccb' : '#c9fdc9'}
      textAnchor={mobile ? 'start' : 'middle'}
      verticalAnchor={mobile ? 'middle' : 'end'}
    >
      {round(props.payload.value, 3)}
    </Text>
  );
}

export default RateBarLabelComponent;
