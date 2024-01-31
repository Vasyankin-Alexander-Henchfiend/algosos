import renderer from "react-test-renderer";
import { sortArray } from "./utils";
import { TArrayElement } from "./string.types";
import { ElementStates } from "../../types/element-states";

async function dummy(x: Array<TArrayElement>) {}

describe("Тестирование алгоритма разворота строки", () => {
  test("результат с чётным количеством символов", async () => {
    const testArray = ["1", "2", "3", "4"].map((item) => {
      return { state: ElementStates.Default, value: item } as TArrayElement;
    });
    const result = (await sortArray(testArray, dummy)).map(
      (item) => item.value
    );
    expect(result).toStrictEqual(["4", "3", "2", "1"]);
  });
});
