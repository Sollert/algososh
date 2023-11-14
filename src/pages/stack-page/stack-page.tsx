import {FormEvent, useState} from "react";

import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";

import styles from './stack-page.module.css'
import {stack} from "./stack";
import {DataElement} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/utils";
import {Circle} from "../../components/ui/circle/circle";

export const StackPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [inProgress, setInProgress] = useState(false);
  const [array, setArray] = useState<(DataElement | null)[]>([])

  const inputChangeHandler = (evt: FormEvent) => {
    const target = evt.target as HTMLInputElement;
    if (target) {
      setInputValue(target.value)
    }
  }

  const handleAddClick = async () => {
    setInProgress(true);

    let lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.isHead = false;
    }

    stack.push({
      value: inputValue,
      state: ElementStates.Changing,
      isHead: true,
    });


    setArray([...stack.getElements()]);
    await delay()

    lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Default;
    }

    setInProgress(false);
    setInputValue('');
  };

  const handleRemoveClick = async () => {
    setInProgress(true);

    let lastElement = stack.peek()
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Changing;
    }

    await delay();
    stack.pop()

    lastElement = stack.peek()
    if (!stack.isEmpty() && lastElement) {
      lastElement.isHead = true;
    }

    setArray([...stack.getElements()]);

    setInProgress(false);
    setInputValue('');
  }

  const handleResetClick = () => {
    stack.clear();
    setArray([...stack.getElements()]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles['form-container']}>
        <Input
          value={inputValue}
          maxLength={4}
          isLimitText={true}
          onChange={inputChangeHandler}
          disabled={inProgress}
        />
        <Button
          text='Добавить'
          type={'submit'}
          onClick={handleAddClick}
          disabled={inProgress || !inputValue}
          isLoader={inProgress}
        />
        <Button
          text='Удалить'
          extraClass={'mr-40'}
          disabled={inProgress || stack.getSize() === 0}
          isLoader={inProgress}
          onClick={handleRemoveClick}
        />
        <Button
          text='Очистить'
          type={'reset'}
          onClick={handleResetClick}
          disabled={inProgress || stack.getSize() === 0}
          isLoader={inProgress}
        />
      </div>
      <div className={styles['stack-container']}>
        {array.map((item, index) => {
          return <Circle
            key={index}
            state={item?.state}
            letter={item?.value.toString()}
            head={item?.isHead ? 'top' : undefined}
            index={index}
          />
        })}
      </div>
    </SolutionLayout>
  );
};
