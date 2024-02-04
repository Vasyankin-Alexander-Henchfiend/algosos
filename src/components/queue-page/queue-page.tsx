import React, {
  useRef,
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
  MouseEvent,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./queue-page.module.css";
import { Queue } from "./queue";
import { TCurrentButton } from "./queue-page.types";

export const QueuePage: React.FC = () => {
  const queue = useRef(new Queue<string>(7));
  const [inputValue, setInputValue] = useState<string>("");
  const [circles, setCircles] = useState<Array<JSX.Element>>();
  const [isAddBtnClick, setIsAddBtnClick] = useState<boolean>(false);
  const [isDelBtnClick, setIsDelBtnClick] = useState<boolean>(false);
  const [currentButton, setCurrentButton] = useState<TCurrentButton>(null);

  const getCircles = useCallback(() => {
    setCircles(
      queue.current.storage.map((item, index) => {
        return (
          <Circle
            letter={item === null ? "" : item}
            key={index}
            index={index}
            head={
              (index === queue.current.getHead() && item !== null) ||
              (index === queue.current.getHead() &&
                queue.current.getHead() === queue.current.size() - 1)
                ? "head"
                : ""
            }
            tail={
              index === queue.current.getTail() && item !== null ? "tail" : ""
            }
            state={
              (isAddBtnClick &&
                (queue.current.storage[0] !== null ||
                  queue.current.getHead() > 0) &&
                queue.current.getTail() + 1 === index) ||
              (isAddBtnClick &&
                queue.current.getTail() === 0 &&
                index === 0 &&
                queue.current.storage[0] === null) ||
              (index === queue.current.getHead() &&
                item !== null &&
                isDelBtnClick)
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        );
      })
    );
  }, [setCircles, queue, isAddBtnClick, isDelBtnClick]);

  useEffect(() => {
    getCircles();
  }, [getCircles]);

  async function refreshCircles() {
    getCircles();
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addNumber = async (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButton(evt.currentTarget.value as TCurrentButton);
    setInputValue("");
    setIsAddBtnClick(true);
    await refreshCircles();
    setIsAddBtnClick(false);
    queue.current.enqueue(inputValue);
    setCurrentButton(null);
  };

  const deleteNumber = async (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButton(evt.currentTarget.value as TCurrentButton);
    setInputValue("");
    setIsDelBtnClick(true);
    await refreshCircles();
    queue.current.dequeue();
    setIsDelBtnClick(false);
    setCurrentButton(null);
  };

  const clearAll = () => {
    setInputValue("");
    queue.current.clear();
    getCircles();
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles[`main-wrapper`]}>
        <div className={styles[`second-wrapper`]}>
          <Input
            data-testid="input-queue"
            type="text"
            isLimitText={true}
            maxLength={4}
            value={inputValue}
            onChange={onChange}
          />
          <Button
            data-testid="add-button-queue"
            text="Добавить"
            value={"Добавить"}
            type="button"
            isLoader={currentButton === "Добавить"}
            onClick={addNumber}
            disabled={inputValue === ""}
          />
          <Button
            data-testid="delete-button-queue"
            text="Удалить"
            value={"Удалить"}
            type="button"
            isLoader={currentButton === "Удалить"}
            onClick={deleteNumber}
          />
        </div>
        <Button
          data-testid="clear-all-button-queue"
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
