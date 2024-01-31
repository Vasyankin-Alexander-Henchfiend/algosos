import renderer from "react-test-renderer";
import { Button } from "./button";

describe("Тестирование компонента Button", () => {
  test("отрисовка кнопки с текстом", () => {
    const tree = renderer.create(<Button text="Текст кнопки" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка кнопки без текста", () => {
    const tree = renderer.create(<Button text="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка заблокированной кнопки", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка с индикацией загрузки", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
