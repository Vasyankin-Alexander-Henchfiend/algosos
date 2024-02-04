import { ElementStates } from "../../types/element-states";
import { TArrayElement } from "./string.types";

export async function sortArray(
  array: Array<TArrayElement>,
  refreshData: (array: Array<TArrayElement>) => Promise<void>
) {
  let start = 0;
  let end = array?.length - 1;
  while (start <= end) {
    const startValue: TArrayElement = array[start];
    const endValue: TArrayElement = array[end];
    startValue.state = ElementStates.Changing;
    endValue.state = ElementStates.Changing;
    await refreshData(array);
    array[start] = endValue;
    array[end] = startValue;
    startValue.state = ElementStates.Modified;
    endValue.state = ElementStates.Modified;
    start++;
    end--;
  }
  await refreshData(array);
  return array;
}
