import * as _ from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";

import * as style from "../styles/style";
import { Button } from "./ConfirmButton";
import { InputArea, OutputArea } from "./Currency";
import { OptionArea } from "./Dropdown";

const URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";

const jsonParser = (text: string) => {
  const arr = text.split("\n");
  const field = arr[1].split("|");
  const records = arr.slice(2, arr.length).filter((item) => {
    return item.includes("|") && item.length > 1;
  });

  const countryKey = field[0];
  const currencyKey = field[1];
  const amountKey = field[2];
  const codeKey = field[3];
  const rateKey = field[4];

  let rateObject = records.map((item) => {
    let itemArr = item.split("|");
    const countryValue = itemArr[0];
    const currencyValue = itemArr[1];
    const amountValue = itemArr[2];
    const codeValue = itemArr[3];
    const rateValue = itemArr[4];
    return {
      [countryKey]: countryValue,
      [currencyKey]: currencyValue,
      [amountKey]: amountValue,
      [codeKey]: codeValue,
      [rateKey]: rateValue,
    };
  });

  return rateObject;
};

export const Dialog = (): JSX.Element => {
  const [inputAmount, setInputAmount] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [outputAmount, setOutputAmount] = useState("");

  const fetchUsers = async () => {
    const res = await fetch(URL);
    return res.text();
  };

  const { data } = useQuery("users", fetchUsers);
  let rates: readonly any[] = [];
  if (data) {
    rates = jsonParser(data);
  }

  const updateValue = (value: string) => {
    setInputAmount(value);
  };

  const updateCountry = (country: string) => {
    setCurrentCountry(country);
  };

  const getExchange = () => {
    if (preCheck()) {
      const currentRate = rates.filter(
        (item) => item.Country === currentCountry
      );
      const rate = parseFloat(currentRate[0].Rate);
      const amount = parseInt(currentRate[0].Amount);
      const input = parseFloat(inputAmount);
      const result = calculate(rate, input, amount);
      setOutputAmount(result.toString());
    }
  };

  const preCheck = () => {
    return (
      !_.isEmpty(inputAmount) &&
      !_.isEmpty(currentCountry) &&
      !isNaN(Number(inputAmount))
    );
  };

  const calculate = (rate: number, input: number, amount: number) => {
    const outputCurrency = (input / rate) * amount;
    return outputCurrency.toFixed(2);
  };

  return (
    <div style={style.mainWrapper}>
      <InputArea value={inputAmount} updateValue={updateValue} />
      <OutputArea value={outputAmount} currentCountry={currentCountry} />
      <div style={style.wrapper}>
        <OptionArea
          options={rates}
          currentCountry={currentCountry}
          updateCountry={updateCountry}
        />
        <Button getExchange={getExchange} />
      </div>
    </div>
  );
};
