import renderer from "react-test-renderer";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe('Тест компонента Circle', () => {
  it('Корректный рендер без буквы', () => {
    const component = renderer.create(
      <Circle />
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Корректный рендер с буквами', () => {
    const component = renderer.create(
      <Circle letter={'Тест'}/>
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Корректный рендер с head', () => {
    const component = renderer.create(
      <Circle head={'Тест'} />
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Корректный рендер с react-элементом в head', () => {
    const head = <Circle isSmall />
    const component = renderer.create(
      <Circle head={head}/>
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Корректный рендер с tail', () => {
    const component = renderer.create(
      <Circle tail={'Тест'} />
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Корректный рендер с react-элементом в tail', () => {
    const tail = <Circle isSmall />
    const component = renderer.create(
      <Circle tail={tail} />
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Корретный рендер с index', () => {
    const component = renderer.create(
      <Circle index={1}/>
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Корректный рендер с isSmall равным true', () => {
    const component = renderer.create(
      <Circle isSmall />
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Корректный рендер в состоянии default', () => {
    const component = renderer.create(
      <Circle state={ElementStates.Default} />
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Корректный рендер в состоянии changing', () => {
    const component = renderer.create(
      <Circle state={ElementStates.Changing} />
    )
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  })

  it('Корректный рендер в состоянии modified', () => {
    const component = renderer.create(
      <Circle state={ElementStates.Modified} />
    )
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  })
})