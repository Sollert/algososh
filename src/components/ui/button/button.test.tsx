import renderer from 'react-test-renderer';
import {Button} from "./button";
import {fireEvent, render, screen} from "@testing-library/react";

describe('Тест компонента Button', () => {
  it('Отрисовать кнопку с текстом', () => {
    const component = renderer.create(
      <Button text={'Развернуть'}/>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Отрисовать кнопку без текста', () => {
    const component = renderer.create(
      <Button/>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Отрисовать заблокированную кнопку', () => {
    const component = renderer.create(
      <Button disabled={true}/>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Отрисовать кнопку c индексацией загрузки', () => {
    const component = renderer.create(
      <Button isLoader={true}/>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Нажатие на кнопку вызывает корректный callback', () => {
   const onClickCallback = jest.fn();
   render(<Button onClick={onClickCallback} text={'Развернуть'}/>);
   const button = screen.getByText('Развернуть');

   fireEvent.click(button);

   expect(onClickCallback).toHaveBeenCalledTimes(1);
  })
})