import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { TArrayElement } from "./string.types";
import { sortArray } from "./utils";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [circles, setCircles] = useState<Array<JSX.Element>>();
  const [loader, setLoader] = useState<boolean>(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  function getCircles(array: Array<TArrayElement>) {
    setCircles(
      array.map((item, index: number) => {
        return <Circle letter={item.value} state={item.state} key={index} />;
      })
    );
  }

  const onClick = () => {
    setLoader(true);
    const array = Array.from(inputValue).map((item) => {
      return { value: item, state: ElementStates.Default } as TArrayElement;
    });
    setInputValue("");
    getCircles(array);
    sortArray(array, refreshData).finally(() => {
      setLoader(false);
    });
  };

  async function refreshData(array: Array<TArrayElement>) {
    getCircles(array);
    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input
          type="text"
          isLimitText={true}
          maxLength={11}
          value={inputValue}
          onChange={onChange}
        ></Input>
        <Button
          text="Развернуть"
          type="button"
          isLoader={loader}
          disabled={!inputValue}
          onClick={onClick}
        />
      </div>
      <div className={styles[`circle-wrapper`]}>{circles}</div>
    </SolutionLayout>
  );
};
