import React, {
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  MouseEvent,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { TCurrentButton, TListElement } from "./list-page.types";
import { LinkedList } from "./linked-list";

const defaultListElement: TListElement = {
  value: null,
  state: ElementStates.Default,
  head: null,
  tail: null,
};

const defaultNumbersArray = ["0", "34", "8", "1"];

export const ListPage: React.FC = () => {
  const linkedList = useRef(new LinkedList<TListElement>());
  const [inputNumberValue, setInputNumberValue] = useState<string>("");
  const [inputIndexValue, setInputIndexValue] = useState<number | undefined>(
    undefined
  );
  const [array, setArray] = useState<(TListElement | null)[]>();
  const [currentButton, setCurrentButton] = useState<TCurrentButton>(null);

  const onNumberInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNumberValue(event.target.value);
  };

  const onIndexInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIndexValue(
      Number.isNaN(event.target.valueAsNumber)
        ? undefined
        : event.target.valueAsNumber
    );
  };

  useEffect(() => {
    addDefaultNumbers(defaultNumbersArray);
    setArray(linkedList.current.toArray());
  }, []);

  function addDefaultNumbers(arr: string[]) {
    arr.forEach((item) =>
      linkedList.current.append({ ...defaultListElement, value: item })
    );
    const linkedListHead = linkedList.current.getHead();
    if (linkedListHead) {
      linkedListHead.head = "head";
    }

    const linkedListTail = linkedList.current.getTail();
    if (linkedListTail) {
      linkedListTail.tail = "tail";
    }
  }

  const renderSmallCircle = (
    item: TListElement,
    isSmall: boolean = false,
    index?: number
  ) => {
    return (
      <Circle
        letter={item?.value ?? ""}
        state={item?.state}
        head={""}
        tail={""}
        key={index}
        isSmall={isSmall}
      />
    );
  };

  async function refreshCircles() {
    setArray(linkedList.current.toArray());
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
  }

  //добавляем голову
  const addHead = async (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButton(evt.currentTarget.value as TCurrentButton);

    const initialHead = linkedList.current.getHead();
    const itemBeingAdded = {
      ...defaultListElement,
      value: inputNumberValue,
      state: ElementStates.Changing,
    };
    setInputNumberValue("");

    if (linkedList.current.toArray().length === 0) {
      linkedList.current.prepend({
        ...itemBeingAdded,
        state: ElementStates.Modified,
        head: "head",
        tail: "tail",
      });
    } else {
      if (initialHead === undefined || initialHead === null) {
        itemBeingAdded.state = ElementStates.Default;
        linkedList.current.prepend(itemBeingAdded);
        setArray(linkedList.current.toArray());
        return;
      }

      initialHead.head = renderSmallCircle(itemBeingAdded, true);
      await refreshCircles();
      initialHead.head = "";
      linkedList.current.prepend({
        ...itemBeingAdded,
        state: ElementStates.Modified,
        head: "head",
      });
    }

    await refreshCircles();

    //получаем новый Head списка и меняем в нём цвет кружка на синий
    const newHead = linkedList.current.getHead();
    if (newHead) {
      newHead.state = ElementStates.Default;
      setArray(linkedList.current.toArray());
    }
    setCurrentButton(null);
  };

  //удаляем голову
  const deleteHead = async (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButton(evt.currentTarget.value as TCurrentButton);

    const initialHead = linkedList.current.getHead();
    if (initialHead === undefined || initialHead === null) {
      return;
    }

    const removedItem = {
      ...initialHead,
      state: ElementStates.Changing,
    };
    initialHead.value = "";
    initialHead.tail = renderSmallCircle(removedItem, true);
    await refreshCircles();

    linkedList.current.deleteHead();
    const newHead = linkedList.current.getHead();
    if (newHead) {
      newHead.head = "head";
    }
    await refreshCircles();
    setCurrentButton(null);
  };

  //добавляем хвост
  const addTail = async (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButton(evt.currentTarget.value as TCurrentButton);

    const initialTail = linkedList.current.getTail();
    const itemBeingAdded = {
      ...defaultListElement,
      value: inputNumberValue,
      state: ElementStates.Changing,
    };
    setInputNumberValue("");

    if (linkedList.current.toArray().length === 0) {
      linkedList.current.prepend({
        ...itemBeingAdded,
        state: ElementStates.Modified,
        head: "head",
        tail: "tail",
      });
    } else {
      if (initialTail === undefined || initialTail === null) {
        itemBeingAdded.state = ElementStates.Default;
        linkedList.current.append(itemBeingAdded);
        setArray(linkedList.current.toArray());
        return;
      }

      initialTail.head = renderSmallCircle(itemBeingAdded, true);
      await refreshCircles();

      initialTail.tail = "";
      initialTail.head = "";
      linkedList.current.append({
        ...itemBeingAdded,
        state: ElementStates.Modified,
        tail: "tail",
      });
    }

    await refreshCircles();

    //получаем новый Tail списка и меняем в нём цвет кружка на синий
    const newTail = linkedList.current.getTail();
    if (newTail) {
      newTail.state = ElementStates.Default;
      setArray(linkedList.current.toArray());
    }
    setCurrentButton(null);
  };

  //Удаляем хвост
  const deleteTail = async (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButton(evt.currentTarget.value as TCurrentButton);

    const initialTail = linkedList.current.getTail();
    if (initialTail === undefined || initialTail === null) {
      return;
    }

    const removedItem = {
      ...initialTail,
      state: ElementStates.Changing,
    };
    initialTail.value = "";
    initialTail.tail = renderSmallCircle(removedItem, true);
    await refreshCircles();

    linkedList.current.deleteTail();
    const newTail = linkedList.current.getTail();
    if (newTail) {
      newTail.tail = "tail";
    }
    await refreshCircles();
    setCurrentButton(null);
  };

  //добавить по индексу
  const addByIndex = async (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButton(evt.currentTarget.value as TCurrentButton);
    let initialItem = {
      ...defaultListElement,
      value: inputNumberValue,
      state: ElementStates.Changing,
    };
    if (inputIndexValue !== undefined) {
      for (let i = 0; i <= inputIndexValue; i++) {
        if (i === 0) {
          await refreshCircles();
          linkedList.current.toArray()[i].head = renderSmallCircle(
            initialItem,
            true
          );
          await refreshCircles();
        }
        if (i > 0) {
          await refreshCircles();
          linkedList.current.toArray()[i - 1].state = ElementStates.Changing;
          if (i - 1 === 0) {
            linkedList.current.toArray()[0].head = "head";
          } else {
            linkedList.current.toArray()[i - 1].head = "";
          }
          linkedList.current.toArray()[i].head = renderSmallCircle(
            initialItem,
            true
          );
          await refreshCircles();
        }
      }
      for (let i = 0; i <= inputIndexValue; i++) {
        linkedList.current.toArray()[i].state = ElementStates.Default;
      }
      linkedList.current.toArray()[inputIndexValue].head = "";
    }

    if (inputIndexValue === 0) {
      initialItem = {
        ...initialItem,
        head: "head",
      };
    }
    linkedList.current.addByIndex(inputIndexValue, {
      ...initialItem,
      state: ElementStates.Modified,
    });
    setInputNumberValue("");
    setInputIndexValue(undefined);
    await refreshCircles();

    const newElement = linkedList.current.getByIndex(inputIndexValue)?.value;
    if (newElement) {
      newElement.state = ElementStates.Default;
    }
    await refreshCircles();
    setCurrentButton(null);
  };

  //удалить по индексу
  const deleteByIndex = async (evt: MouseEvent<HTMLButtonElement>) => {
    setCurrentButton(evt.currentTarget.value as TCurrentButton);
    if (inputIndexValue !== undefined) {
      for (let i = 0; i <= inputIndexValue; i++) {
        await refreshCircles();
        linkedList.current.toArray()[i].state = ElementStates.Changing;
        await refreshCircles();
      }
    }

    const initialItem = linkedList.current.getByIndex(inputIndexValue)?.value;
    if (initialItem === undefined || initialItem === null) {
      return;
    }

    const removedValue = { ...initialItem, state: ElementStates.Changing };
    initialItem.value = "";
    initialItem.state = ElementStates.Default;
    initialItem.tail = renderSmallCircle(removedValue, true);
    await refreshCircles();

    linkedList.current.deleteByIndex(inputIndexValue);

    if (inputIndexValue !== undefined) {
      for (let i = 0; i < inputIndexValue; i++) {
        linkedList.current.toArray()[i].state = ElementStates.Default;
      }
    }
    setInputIndexValue(undefined);
    if (linkedList.current.toArray().length > 0) {
      if (inputIndexValue === linkedList.current.toArray().length) {
        linkedList.current.toArray()[
          linkedList.current.toArray().length - 1
        ].tail = "tail";
      }
      if (inputIndexValue === 0) {
        linkedList.current.toArray()[0].head = "head";
      }
    }
    await refreshCircles();
    setCurrentButton(null);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles[`controls-container`]}>
        <div className={styles[`button-wrapper`]}>
          <Input
            data-testid="number-input-list"
            type="text"
            placeholder="введите значение"
            isLimitText={true}
            maxLength={4}
            value={inputNumberValue}
            onChange={onNumberInputChange}
            extraClass={styles.input}
          />
          <Button
            data-testid="add-head-button-list"
            text="Добавить в head"
            type="button"
            value={"Добавить в head"}
            isLoader={currentButton === "Добавить в head"}
            onClick={addHead}
            disabled={inputNumberValue === "" || !!currentButton}
          />
          <Button
            data-testid="add-tail-button-list"
            text="Добавить в tail"
            type="button"
            value={"Добавить в tail"}
            isLoader={currentButton === "Добавить в tail"}
            onClick={addTail}
            disabled={inputNumberValue === "" || !!currentButton}
          />
          <Button
            data-testid="delete-head-button-list"
            text="Удалить из head"
            type="button"
            value={"Удалить из head"}
            isLoader={currentButton === "Удалить из head"}
            onClick={deleteHead}
            disabled={!!currentButton}
          />
          <Button
            data-testid="delete-tail-button-list"
            text="Удалить из tail"
            type="button"
            value={"Удалить из tail"}
            isLoader={currentButton === "Удалить из tail"}
            onClick={deleteTail}
            disabled={!!currentButton}
          />
        </div>
        <div className={styles[`button-wrapper`]}>
          <Input
            data-testid="index-input-list"
            type="number"
            placeholder="введите индекс"
            max={linkedList.current.toArray().length - 1}
            min={0}
            value={inputIndexValue ?? ""}
            onChange={onIndexInputChange}
            extraClass={styles.input}
          />
          <Button
            data-testid="add-by-index-button-list"
            text="Добавить по индексу"
            type="button"
            isLoader={currentButton === "Добавить по индексу"}
            value={"Добавить по индексу"}
            onClick={addByIndex}
            linkedList="big"
            disabled={
              inputIndexValue === undefined ||
              inputIndexValue > linkedList.current.toArray().length - 1 ||
              inputIndexValue < 0 ||
              !!currentButton
            }
          />
          <Button
            data-testid="delete-by-index-button-list"
            text="Удалить по индексу"
            type="button"
            isLoader={currentButton === "Удалить по индексу"}
            value={"Удалить по индексу"}
            onClick={deleteByIndex}
            linkedList="big"
            disabled={
              inputIndexValue === undefined ||
              inputIndexValue > linkedList.current.toArray().length - 1 ||
              inputIndexValue < 0 ||
              !!currentButton
            }
          />
        </div>
      </div>
      <div className={styles[`circles`]}>
        {array?.map((item, index) => (
          <div key={index} className={styles[`circle-wrapper`]}>
            <Circle
              letter={item?.value ?? ""}
              state={item?.state}
              head={item?.head}
              tail={item?.tail}
              index={index}
            />
            {index < array.length - 1 ? <ArrowIcon /> : null}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
