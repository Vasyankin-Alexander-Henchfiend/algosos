import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TColumnElement } from "./sorting-page.types";
import { getBubbleSort, getSelectionSort } from "./utils";

async function emptyRefreshFunc(someArray: Array<TColumnElement>) {}

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  test("Алгоритм сортировки выбором корректно сортирует пустой массив", async () => {
    const testArray = [].map((item) => {
      return { value: item, state: ElementStates.Default } as TColumnElement;
    });
    const result = (
      await getSelectionSort(testArray, Direction.Ascending, emptyRefreshFunc)
    ).map((item) => item.value);
    expect(result).toStrictEqual([]);
  });

  test("Алгоритм сортировки выбором корректно сортирует массив из одного элемента", async () => {
    const testArray = [1].map((item) => {
      return { value: item, state: ElementStates.Default } as TColumnElement;
    });
    const result = (
      await getSelectionSort(testArray, Direction.Ascending, emptyRefreshFunc)
    ).map((item) => item.value);
    expect(result).toStrictEqual([1]);
  });

  test("Алгоритм сортировки выбором корректно сортирует массив из нескольких элементов", async () => {
    const testArray = [32, 17, 65, 7, 46, 95].map((item) => {
      return { value: item, state: ElementStates.Default } as TColumnElement;
    });
    const result = (
      await getSelectionSort(testArray, Direction.Ascending, emptyRefreshFunc)
    ).map((item) => item.value);
    expect(result).toStrictEqual([7, 17, 32, 46, 65, 95]);
  });

  test("Алгоритм сортировки пузырьком корректно сортирует пустой массив", async () => {
    const testArray = [].map((item) => {
      return { value: item, state: ElementStates.Default } as TColumnElement;
    });
    const result = (
      await getBubbleSort(testArray, Direction.Ascending, emptyRefreshFunc)
    ).map((item) => item.value);
    expect(result).toStrictEqual([]);
  });

  test("Алгоритм сортировки пузырьком корректно сортирует массив из одного элемента", async () => {
    const testArray = [1].map((item) => {
      return { value: item, state: ElementStates.Default } as TColumnElement;
    });
    const result = (
      await getBubbleSort(testArray, Direction.Ascending, emptyRefreshFunc)
    ).map((item) => item.value);
    expect(result).toStrictEqual([1]);
  });

  test("Алгоритм сортировки пузырьком корректно сортирует массив из нескольких элементов", async () => {
    const testArray = [32, 17, 65, 7, 46, 95].map((item) => {
      return { value: item, state: ElementStates.Default } as TColumnElement;
    });
    const result = (
      await getBubbleSort(testArray, Direction.Ascending, emptyRefreshFunc)
    ).map((item) => item.value);
    expect(result).toStrictEqual([7, 17, 32, 46, 65, 95]);
  });
});
