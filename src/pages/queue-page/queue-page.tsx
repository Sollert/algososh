import {FormEvent, useState} from "react";

import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";

import {DataElement} from "../../types/types";
import {ElementStates} from "../../types/element-states";

import {queue} from "./queue";

import {HEAD, TAIL} from "../../constants/element-captions";
import {QUEUE_INPUT_MAX_LENGTH, QUEUE_MAX_LENGTH} from "../../constants/numbers";

import {delay} from "../../utils/utils";

import styles from './queue-page.module.css';

export const QueuePage = () => {
  const [inputValue, setInputValue] = useState('')
  const [inProgress, setInProgress] = useState(false);
  const initialQueueElements = Array.from({length: QUEUE_MAX_LENGTH}, () => ({
    value: '',
    state: ElementStates.Default,
  }));
  const [array, setArray] = useState<(DataElement | null)[]>(initialQueueElements)
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const inputChangeHandler = (evt: FormEvent) => {
    const target = evt.target as HTMLInputElement;
    if (target) {
      setInputValue(target.value)
    }
  }

  const handleAddClick = async (evt: FormEvent) => {
    evt.preventDefault();
    setInProgress(true);
    setIsAdding(true);

    let tail = queue.getTailElement();
    queue.enqueue({value: '', state: ElementStates.Changing})
    setArray([...queue.getElements()])

    await delay()
    if (tail?.value) tail.value.isTail = false;

    tail = queue.getTailElement();
    if (tail?.value) {
      tail.value.state = ElementStates.Default;
      tail.value.value = inputValue
      tail.value.isTail = true;
      tail.value.isHead = tail.index === 0;
    }

    setArray([...queue.getElements()])
    setInputValue('')
    setInProgress(false)
    setIsAdding(false);
  }

  const handleRemoveClick = async () => {
    setInProgress(true);
    setIsDeleting(true);

    let tail = queue.getTailElement();
    let head = queue.getHeadElement();

    if (head?.value && !queue.isEmpty()) {
      head.value.state = ElementStates.Changing;
      await delay();
      setArray([...queue.getElements()])
      queue.dequeue();
    }

    if (tail?.index === head?.index) {
      queue.clear()
    }

    head = queue.getHeadElement();
    if (head?.value) {
      head.value.state = ElementStates.Default;
      head.value.isHead = true;
    }

    setArray([...queue.getElements()]);
    setInputValue('');
    setInProgress(false);
    setIsDeleting(false);
  }

  const handleResetClick = async () => {
    setInProgress(true)

    queue.clear();
    await delay();
    setArray([...queue.getElements()]);

    setInputValue('')
    setInProgress(false)
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles['form-container']} onSubmit={handleAddClick} onReset={handleResetClick}>
        <Input
          value={inputValue}
          maxLength={QUEUE_INPUT_MAX_LENGTH}
          isLimitText={true}
          onChange={inputChangeHandler}
          disabled={inProgress}
          data-cy={"value-input"}
        />
        <Button
          text='Добавить'
          type={'submit'}
          disabled={isDeleting || !inputValue || queue.getTailElement()?.index === QUEUE_MAX_LENGTH - 1}
          isLoader={isAdding}
          onClick={handleAddClick}
          data-cy={"submit-button"}
        />
        <Button
          text='Удалить'
          extraClass={'mr-40'}
          disabled={isAdding || queue.getSize() === 0}
          isLoader={isDeleting}
          onClick={handleRemoveClick}
          data-cy={"delete-button"}
        />
        <Button
          text='Очистить'
          type={'reset'}
          disabled={isAdding || isDeleting || queue.getSize() === 0}
          isLoader={inProgress && !isAdding && !isDeleting}
          onClick={handleResetClick}
          data-cy={"reset-button"}
        />
      </form>
      <div className={styles['queue-container']} data-cy={"list"}>
        {array.map((element: DataElement | null, index: number) => (
          <Circle
            key={index}
            state={element?.state}
            letter={element?.value.toString()}
            head={element?.isHead ? HEAD : ''}
            tail={element?.isTail ? TAIL : ''}
            index={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
