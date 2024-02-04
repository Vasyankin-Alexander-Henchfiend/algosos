import React, {
  useState,
  ChangeEvent,
  MouseEvent,
  useEffect,
  useCallback,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TColumnElement, TCurrentButton } from "./sorting-page.types";
import { getBubbleSort, getSelectionSort } from "./utils";

export const SortingPage: React.FC = () => {
  const [columns, setColumns] = useState<Array<JSX.Element>>();
  const [array, setArray] = useState<Array<TColumnElement>>([]);
  const [currentButton, setCurrentButton] = useState<TCurrentButton>(null);
  const [sortMethod, setSortMethod] = useState<string>("Выбор");

  const getRandomLenght = () => {
    return ~~(Math.random() * (17 - 3 + 1)) + 3;
  };

  const generateArray = (length: number, max: number) =>
    [...new Array(length)].map(() => Math.round(Math.random() * max));

  const randomArr = useCallback(() => {
    const lenght = getRandomLenght();
    const newArray = generateArray(lenght, 100).map((item) => {
      return { value: item, state: ElementStates.Default } as TColumnElement;
    });
    setArray(newArray);
    getColumns(newArray);
  }, []);

  useEffect(() => {
    randomArr();
  }, [randomArr]);

  function getColumns(array: Array<TColumnElement>) {
    return setColumns(
      array.map((item, index) => {
        return <Column index={item.value} key={index} state={item.state} />;
      })
    );
  }

  async function refreshData(array: Array<TColumnElement>) {
    getColumns(array);
    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
  }

  const handleSortMethodChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSortMethod(evt.target.value);
  };

  const onClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if (sortMethod === "Выбор") {
      setCurrentButton(evt.currentTarget.value as TCurrentButton);
      getSelectionSort(
        array,
        evt.currentTarget.value as Direction,
        refreshData
      ).finally(() => setCurrentButton(null));
    }
    if (sortMethod === "Пузырёк") {
      setCurrentButton(evt.currentTarget.value as TCurrentButton);
      getBubbleSort(
        array,
        evt.currentTarget.value as Direction,
        refreshData
      ).finally(() => setCurrentButton(null));
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles[`buttons-wrapper`]}>
        <RadioInput
          label="Выбор"
          value="Выбор"
          onChange={handleSortMethodChange}
          checked={sortMethod === "Выбор"}
        />
        <RadioInput
          label="Пузырёк"
          value="Пузырёк"
          onChange={handleSortMethodChange}
          checked={sortMethod === "Пузырёк"}
        />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          value={Direction.Ascending}
          type="button"
          onClick={onClick}
          disabled={!currentButton ? false : true}
          isLoader={currentButton === Direction.Ascending}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          value={Direction.Descending}
          type="button"
          onClick={onClick}
          disabled={!currentButton ? false : true}
          isLoader={currentButton === Direction.Descending}
        />
        <Button
          text="Новый массив"
          type="button"
          onClick={randomArr}
          disabled={!currentButton ? false : true}
        />
      </div>
      <div className={styles[`array-wrapper`]}>{columns}</div>
    </SolutionLayout>
  );
};
