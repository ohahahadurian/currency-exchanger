import { useEffect } from 'react';

import * as style from '../styles/style';

interface OptionAreaProps {
  currentCountry: string;
  updateCountry: (country: string) => void;
  options: ReadonlyArray<Rate | any>;
}

export const OptionArea = (props: OptionAreaProps): JSX.Element => {
  const defaultCountry =
    props.options[0] && props.options[0].Country
      ? props.options[0].Country
      : "";

  useEffect(() => {
    props.updateCountry(defaultCountry);
  }, [defaultCountry]);

  return (
    <div className="selection">
        <select style={style.selection}
          className="options"
          defaultValue={defaultCountry}
          onChange={(e) => props.updateCountry(e.target.value)}
        >
          {props.options?.map((item, index) => (
            <option key={index} className="option-item" value={item.Country}>
              {item.Country}
            </option>
          ))}
        </select>

    </div>
  );
};

export interface Rate {
  Country: string;
  Currency: string;
  Amount: string;
  Code: string;
  Rate: string;
}
