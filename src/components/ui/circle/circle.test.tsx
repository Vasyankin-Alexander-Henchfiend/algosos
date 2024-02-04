import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Тестирование компонента Circle", () => {
  test("отрисовка без буквы", () => {
    const tree = renderer.create(<Circle letter="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка с буквами", () => {
    const tree = renderer.create(<Circle letter="текст" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка с head", () => {
    const tree = renderer.create(<Circle head="текст" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка с react-элементом в head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка с tail", () => {
    const tree = renderer.create(<Circle tail="текст" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка с react-элементом в tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка с index", () => {
    const tree = renderer.create(<Circle index={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка с пропом isSmall ===  true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка в состоянии default", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка в состоянии changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("отрисовка в состоянии modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
