import React from 'react';

import * as style from '../styles/style';

interface InputAreaProps {
  value: string;
  updateValue: (status: string) => void;
}

export const InputArea = (props: InputAreaProps): JSX.Element => {
  return (
    <div className="inputbox">
      <label style={style.label}>Czech</label>
      <input
        name="myInput"
        value={props.value}
        onChange={(e) => props.updateValue(e.target.value)}
      />
    </div>
  );
};

interface OutputAreaProps {
  value: string;
  currentCountry: string;
}

export const OutputArea = (props: OutputAreaProps): JSX.Element => {
  return (
    <div>
      <label style={style.label}>{props.currentCountry}</label>
      <input value={props.value} readOnly />
    </div>
  );
};
