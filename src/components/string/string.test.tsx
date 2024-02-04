import { sortArray } from "./utils";
import { TArrayElement } from "./string.types";
import { ElementStates } from "../../types/element-states";

async function emptyRefreshFunc(someArray: Array<TArrayElement>) {}

describe("Тестирование алгоритма разворота строки", () => {
  test("Результат с чётным количеством символов", async () => {
    const testArray = ["1", "2", "3", "4"].map((item) => {
      return { state: ElementStates.Default, value: item } as TArrayElement;
    });
    const result = (await sortArray(testArray, emptyRefreshFunc)).map(
      (item) => item.value
    );
    expect(result).toStrictEqual(["4", "3", "2", "1"]);
  });

  test("Результат с нечетным количеством символов", async () => {
    const testArray = ["1", "2", "3", "4", "5"].map((item) => {
      return { state: ElementStates.Default, value: item } as TArrayElement;
    });
    const result = (await sortArray(testArray, emptyRefreshFunc)).map(
      (item) => item.value
    );
    expect(result).toStrictEqual(["5", "4", "3", "2", "1"]);
  });

  test("Результат с одним символом", async () => {
    const testArray = ["1"].map((item) => {
      return { state: ElementStates.Default, value: item } as TArrayElement;
    });
    const result = (await sortArray(testArray, emptyRefreshFunc)).map(
      (item) => item.value
    );
    expect(result).toStrictEqual(["1"]);
  });

  test("Результат с пустой строкой", async () => {
    const testArray = [""].map((item) => {
      return { state: ElementStates.Default, value: item } as TArrayElement;
    });
    const result = (await sortArray(testArray, emptyRefreshFunc)).map(
      (item) => item.value
    );
    expect(result).toStrictEqual([""]);
  });
});
