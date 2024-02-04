import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TColumnElement } from "./sorting-page.types";

export async function getSelectionSort(
  arr: Array<TColumnElement>,
  sortDirection: Direction,
  refreshData: (array: Array<TColumnElement>) => Promise<void>
) {
  for (let i = 0; i <= arr.length - 1; i++) {
    let minIndex = i;
    arr[i].state = ElementStates.Changing;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].state = ElementStates.Changing;
      await refreshData(arr);
      if (sortDirection === Direction.Ascending) {
        if (arr[j].value < arr[minIndex].value) {
          minIndex = j;
        }
      }
      if (sortDirection === Direction.Descending) {
        if (arr[j].value > arr[minIndex].value) {
          minIndex = j;
        }
      }
      arr[j].state = ElementStates.Default;
    }
    arr[i].state = ElementStates.Default;
    arr[minIndex].state = ElementStates.Modified;
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    arr[i].state = ElementStates.Modified;
  }
  await refreshData(arr);
  return arr;
}

export async function getBubbleSort(
  arr: Array<TColumnElement>,
  sortDirection: Direction,
  refreshData: (array: Array<TColumnElement>) => Promise<void>
) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - (i + 1); j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      await refreshData(arr);
      if (sortDirection === Direction.Ascending) {
        if (arr[j].value > arr[j + 1].value) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          await refreshData(arr);
        }
      }
      if (sortDirection === Direction.Descending) {
        if (arr[j].value < arr[j + 1].value) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          await refreshData(arr);
        }
      }
      arr[j].state = ElementStates.Default;
      arr[j + 1].state = ElementStates.Modified;
    }
  }
  if (arr.length > 0) {
    arr[0].state = ElementStates.Modified;
  }
  await refreshData(arr);
  return arr;
}
