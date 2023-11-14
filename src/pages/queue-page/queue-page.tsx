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

  const inputChangeHandler = (evt: FormEvent) => {
    const target = evt.target as HTMLInputElement;
    if (target) {
      setInputValue(target.value)
    }
  }

  const handleAddClick = async () => {
    setInProgress(true);

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
  }

  const handleRemoveClick = async () => {
    setInProgress(true);

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

    setArray([...queue.getElements()])
    setInputValue('')
    setInProgress(false)
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
        />
        <Button
          text='Добавить'
          type={'submit'}
          disabled={inProgress || !inputValue || queue.getTailElement()?.index === QUEUE_MAX_LENGTH - 1}
          isLoader={inProgress}
          onClick={handleAddClick}
        />
        <Button
          text='Удалить'
          extraClass={'mr-40'}
          disabled={inProgress || queue.getSize() === 0}
          isLoader={inProgress}
          onClick={handleRemoveClick}
        />
        <Button
          text='Очистить'
          type={'reset'}
          disabled={inProgress || queue.getSize() === 0}
          isLoader={inProgress}
          onClick={handleResetClick}
        />
      </form>
      <div className={styles['queue-container']}>
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
