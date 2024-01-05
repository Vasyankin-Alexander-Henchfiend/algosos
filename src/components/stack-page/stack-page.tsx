import React, { useRef, useState, ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack";
import { TCurrentButton } from "./stack-page.types";

export const StackPage: React.FC = () => {
  const stack = useRef(new Stack<string>());
  const [inputValue, setInputValue] = useState<string>("");
  const [circles, setCircles] = useState<Array<JSX.Element>>();
  const [currentButton, setCurrentButton] = useState<TCurrentButton>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  function getCircles(isChecked: boolean = true) {
    return stack.current.storage.map((item, index: number) => {
      return (
        <Circle
          letter={item}
          key={index}
          index={index}
          head={stack.current.storage.length - 1 === index ? "top" : ""}
          state={
            stack.current.storage.length - 1 === index && isChecked
              ? ElementStates.Changing
              : ElementStates.Default
          }
        />
      );
    });
  }

  async function refreshCircles() {
    setCircles(getCircles());
    await new Promise((resolve) =>
      setTimeout(resolve, SHORT_DELAY_IN_MS)
    ).finally(() => setCircles(getCircles(false)));
  }

  const addNumber = async (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButton(evt.currentTarget.value as TCurrentButton);
    stack.current.push(inputValue);
    setInputValue("");
    await refreshCircles();
    setCurrentButton(null);
  };

  const deleteNumber = async (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButton(evt.currentTarget.value as TCurrentButton);
    setInputValue("");
    await refreshCircles();
    stack.current.pop();
    setCircles(getCircles(false));
    setCurrentButton(null);
  };

  const clearAll = () => {
    stack.current.clear();
    setInputValue("");
    setCircles([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles[`main-wrapper`]}>
        <div className={styles[`second-wrapper`]}>
          <Input
            type="text"
            isLimitText={true}
            maxLength={4}
            value={inputValue}
            onChange={onChange}
          />
          <Button
            text="Добавить"
            value={"Добавить"}
            type="button"
            isLoader={currentButton === "Добавить"}
            onClick={addNumber}
            disabled={!inputValue}
          />
          <Button
            text="Удалить"
            value={"Удалить"}
            type="button"
            isLoader={currentButton === "Удалить"}
            onClick={deleteNumber}
          />
        </div>
        <Button
          text="Очистить"
          type="button"
          isLoader={false}
          onClick={clearAll}
        />
      </div>
      <div className={styles[`circles-wrapper`]}>{circles}</div>
    </SolutionLayout>
  );
};
