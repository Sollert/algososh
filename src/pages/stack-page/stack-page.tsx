import {FormEvent, useState} from "react";

import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";

import {STACK_INPUT_MAX_LENGTH} from "../../constants/numbers";
import {stack} from "./stack";
import {delay} from "../../utils/utils";

import {DataElement} from "../../types/types";
import {ElementStates} from "../../types/element-states";

import styles from './stack-page.module.css'

export const StackPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [inProgress, setInProgress] = useState(false);
  const [array, setArray] = useState<(DataElement | null)[]>([])
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const inputChangeHandler = (evt: FormEvent) => {
    const target = evt.target as HTMLInputElement;
    if (target) {
      setInputValue(target.value)
    }
  }

  const handleAddClick = async () => {
    setInProgress(true);
    setIsAdding(true);

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
    setIsAdding(false);
    setInputValue('');
  };

  const handleRemoveClick = async () => {
    setInProgress(true);
    setIsDeleting(true)

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
    setIsDeleting(false)
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
          maxLength={STACK_INPUT_MAX_LENGTH}
          isLimitText={true}
          onChange={inputChangeHandler}
          disabled={inProgress}
          data-cy="input-value"
        />
        <Button
          text='Добавить'
          type={'submit'}
          onClick={handleAddClick}
          disabled={isDeleting || !inputValue}
          isLoader={isAdding}
        />
        <Button
          text='Удалить'
          type={"button"}
          data-cy={"delete-button"}
          extraClass={'mr-40'}
          disabled={isAdding || stack.getSize() === 0}
          isLoader={isDeleting}
          onClick={handleRemoveClick}
        />
        <Button
          text='Очистить'
          type={'reset'}
          onClick={handleResetClick}
          disabled={isDeleting || isAdding || stack.getSize() === 0}
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
