import {FormEvent, useEffect, useMemo, useState} from 'react';

import {SolutionLayout} from '../../components/ui/solution-layout/solution-layout';
import {Input} from '../../components/ui/input/input';
import {Button} from '../../components/ui/button/button';
import {Circle} from '../../components/ui/circle/circle';
import {ArrowIcon} from '../../components/ui/icons/arrow-icon';

import {delay} from '../../utils/utils';

import {DataElement} from "../../types/types";
import {ElementStates} from "../../types/element-states";

import {LinkedList} from "./list";
import styles from './list-page.module.css';
import {LIST_INPUT_MAX_LENGTH} from "../../constants/numbers";
import {HEAD, TAIL} from "../../constants/element-captions";

// определение функционального компонента
export const ListPage = () => {
  const initialListElements = useMemo(() => ['0', '34', '8', '1'], []);
  const list = useMemo(
    () => new LinkedList<string | number>(initialListElements),
    [initialListElements],
  );
  const initialList: DataElement[] = useMemo(() => [], []);

  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState<number>(-1);
  const [listElements, setListElements] = useState<(DataElement | null)[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const [isAddingHead, setIsAddingHead] = useState(false);
  const [isDeletingHead, setIsDeletingHead] = useState(false);
  const [isAddingTail, setIsAddingTail] = useState(false);
  const [isDeletingTail, setIsDeletingTail] = useState(false);
  const [isAddingAtIndex, setIsAddingAtIndex] = useState(false);
  const [isDeletingAtIndex, setIsDeletingAtIndex] = useState(false);

  useEffect(() => {
    initialListElements.forEach((element) => {
      initialList.push({
        value: element,
        state: ElementStates.Default,
        isHead: false,
        isTail: false,
        isLinked: true,
      });
    });

    initialList[0].isHead = true;
    initialList[initialList.length - 1].isTail = true;
    initialList[initialList.length - 1].isLinked = false;
    setListElements(initialList);
  }, [initialList, initialListElements, list]);

  const valueChangeHandler = (evt: FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);
  };

  const indexChangeHandler = (evt: FormEvent<HTMLInputElement>) => {
    setInputIndex(parseInt(evt.currentTarget.value));
  };

  const addToHead = async () => {
    setInProgress(true);
    setIsAddingHead(true);

    listElements[0]!.isHead = false;
    listElements[0]!.isLinked = true;
    listElements[0]!.changingPosition = true;
    listElements[0]!.newValue = inputValue;
    await delay();
    setListElements([...listElements])

    listElements[0]!.changingPosition = false;
    list.prepend(inputValue);
    const head = list.getAtIndex(0);
    listElements.unshift({
      value: head ? head : '',
      state: ElementStates.Modified,
      isHead: true,
      isTail: false,
      isLinked: true,
    });
    setListElements([...listElements]);

    listElements[0]!.state = ElementStates.Default;
    await delay();
    setListElements([...listElements])

    setInProgress(false);
    setIsAddingHead(false)
    setInputIndex(-1);
    setInputValue('');
  };

  const addToTail = async () => {
    setInProgress(true);
    setIsAddingTail(true);

    let tailIndex = list.getSize() - 1;
    if (tailIndex === 0) listElements[tailIndex]!.isHead = false;

    listElements[tailIndex]!.isTail = false;
    listElements[tailIndex]!.changingPosition = true;
    listElements[tailIndex]!.newValue = inputValue;
    await delay();
    setListElements([...listElements]);

    listElements[tailIndex]!.changingPosition = false;
    listElements[tailIndex]!.isLinked = true;
    listElements[0]!.isHead = true;

    list.append(inputValue);
    listElements.push({
      value: inputValue,
      state: ElementStates.Modified,
      isTail: true,
      isLinked: false,
    });
    setListElements([...listElements]);

    tailIndex = list.getSize() - 1;
    listElements[tailIndex]!.state = ElementStates.Default;
    await delay()
    setListElements([...listElements])

    setInProgress(false);
    setIsAddingTail(false)
    setInputIndex(-1);
    setInputValue('');
  };

  const deleteHead = async () => {
    setInProgress(true);
    setIsDeletingHead(true)

    listElements[0]!.changingPosition = true;
    listElements[0]!.newValue = listElements[0]!.value;
    listElements[0]!.value = '';
    await delay()
    setListElements([...listElements])
    listElements[0]!.changingPosition = false;

    list.deleteHead();
    listElements.shift();
    listElements[0]!.isHead = true;
    await delay()
    setListElements([...listElements])

    setInProgress(false);
    setIsDeletingHead(false);
    setInputIndex(-1);
    setInputValue('');
  };

  const deleteTail = async () => {
    setInProgress(true);
    setIsDeletingTail(true);
    listElements[list.getSize() - 1]!.changingPosition = true;
    listElements[list.getSize() - 1]!.newValue =
      listElements[list.getSize() - 1]!.value;
    listElements[list.getSize() - 1]!.value = '';
    listElements[list.getSize() - 1]!.isTail = false;

    await delay()
    setListElements([...listElements])
    listElements[list.getSize() - 1]!.changingPosition = false;

    list.deleteTail();
    listElements.pop();
    listElements[list.getSize() - 1]!.isTail = true;
    listElements[list.getSize() - 1]!.isLinked = false;

    await delay()
    setListElements([...listElements])
    setInProgress(false);
    setIsDeletingTail(false);
    setInputIndex(-1);
    setInputValue('');
  };

  const addIndex = async () => {
    setInProgress(true);
    setIsAddingAtIndex(true);

    list.addAtIndex(inputIndex, inputValue);
    for (let i = 0; i <= inputIndex; i++) {
      listElements[i]!.state = ElementStates.Changing;
      listElements[i]!.changingPosition = true;
      listElements[i]!.newValue = inputValue;
      listElements[i]!.isHead = false;
      await delay()
      setListElements([...listElements])
      listElements[i]!.changingPosition = false;
      if (inputIndex !== 0) {
        listElements[0]!.isHead = true;
      }
    }

    const insertedNode = list.getAtIndex(inputIndex);
    listElements.splice(inputIndex, 0, {
      value: insertedNode ? insertedNode : '',
      state: ElementStates.Modified,
      isLinked: true,
    });
    listElements[0]!.isHead = true;
    listElements[list.getSize() - 1]!.isTail = true;
    setListElements([...listElements]);
    for (let i = 0; i <= inputIndex + 1; i++) {
      listElements[i]!.state = ElementStates.Default;
    }
    await delay()
    setListElements([...listElements])

    setInProgress(false);
    setIsAddingAtIndex(false);
    setInputIndex(-1);
    setInputValue('');
  };

  const deleteIndex = async () => {
    setInProgress(true);
    setIsDeletingAtIndex(true);

    list.deleteAtIndex(inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      listElements[i]!.state = ElementStates.Changing;
      listElements[i]!.changingPosition = true;
      listElements[i]!.isTail = false;
      setListElements([...listElements]);
      if (i === inputIndex) {
        const value = listElements[i]!.value;
        listElements[i]!.value = '';
        await delay()
        setListElements([...listElements])
        listElements[i]!.newValue = value;
      }

      await delay();
      setListElements([...listElements])

      listElements[i]!.changingPosition = false;
      setListElements([...listElements]);
    }
    listElements.splice(inputIndex, 1);
    listElements[0]!.isHead = true;
    listElements[list.getSize() - 1]!.isTail = true;
    listElements[list.getSize() - 1]!.isLinked = false;
    setListElements([...listElements]);

    for (let i = 0; i < inputIndex; i++) {
      listElements[i]!.state = ElementStates.Default;
    }

    setInProgress(false);
    setIsDeletingAtIndex(false);
    setInputIndex(-1);
    setInputValue('');
  };


  return (
    <SolutionLayout title='Связный список'>
      <form className={styles['form-container']}>
        <div className={styles['inputs-container']}>
          <Input
            type='text'
            placeholder='Введите значение'
            value={inputValue}
            onChange={valueChangeHandler}
            isLimitText={true}
            maxLength={LIST_INPUT_MAX_LENGTH}
            disabled={inProgress}
            extraClass={styles['input']}
          />
          <Input
            type='number'
            placeholder='Введите индекс'
            value={inputIndex >= 0 ? inputIndex : ''}
            onChange={indexChangeHandler}
            disabled={inProgress}
            extraClass={styles['input']}
          />
        </div>
        <div className={styles['buttons-container']}>
          <Button
            text='Добавить в head'
            type='button'
            data='add-at-head-button'
            onClick={addToHead}
            isLoader={isAddingHead}
            disabled={(inProgress && !isAddingHead)
              || inputValue.length === 0
              || isDeletingHead
              || isAddingTail
              || isDeletingAtIndex
              || isDeletingTail
              || isAddingAtIndex}
            extraClass={styles['button']}
          />
          <Button
            text='Добавить в tail'
            type='button'
            data='add-at-tail-button'
            onClick={addToTail}
            isLoader={isAddingTail}
            disabled={(inProgress && !isAddingTail)
              || inputValue.length === 0
              || isAddingHead
              || isDeletingHead
              || isDeletingAtIndex
              || isDeletingTail
              || isAddingAtIndex}
            extraClass={styles['button']}
          />
          <Button
            text='Добавить по индексу'
            type='button'
            data='add-at-index-button'
            extraClass={styles['button']}
            onClick={addIndex}
            isLoader={isAddingAtIndex}
            disabled={
              inputIndex < 0
              || inputIndex >= list.getSize()
              || inputValue.length === 0
              || isAddingHead
              || isAddingTail
              || isDeletingAtIndex
              || isDeletingTail
              || isDeletingHead
            }
          />
        </div>
        <div className={styles['buttons-container']}>
          <Button
            text='Удалить из head'
            type='button'
            data='delete-at-head-button'
            onClick={deleteHead}
            isLoader={isDeletingHead}
            disabled={list.isEmpty()
              || list.getSize() < 2
              || isAddingHead
              || isAddingTail
              || isDeletingAtIndex
              || isDeletingTail
              || isAddingAtIndex}
            extraClass={styles['button']}
          />
          <Button
            text='Удалить из tail'
            type='button'
            data='delete-at-tail-button'
            onClick={deleteTail}
            isLoader={isDeletingTail}
            disabled={
              list.isEmpty()
              || list.getSize() < 2
              || isAddingHead
              || isAddingTail
              || isDeletingHead
              || isDeletingAtIndex
              || isAddingAtIndex}
            extraClass={styles['button']}
          />
          <Button
            text='Удалить по индексу'
            type='button'
            data='delete-at-index-button'
            extraClass={styles['button']}
            onClick={deleteIndex}
            isLoader={isDeletingAtIndex}
            disabled={
              inputIndex < 0
              || list.isEmpty()
              || inputIndex >= list.getSize()
              || isAddingHead
              || isAddingTail
              || isDeletingHead
              || isDeletingTail
              || isAddingAtIndex
            }
          />
        </div>
      </form>
      <ul className={styles['list']}>
        {listElements.map((element, index) => (
          <div className={styles['list-element']} key={index} data-test-id='circle'>
            {(isAddingHead || isAddingTail || isAddingAtIndex) &&
              element?.changingPosition && (
                <Circle
                  state={ElementStates.Changing}
                  letter={element?.newValue?.toString()}
                  isSmall={true}
                  extraClass={styles['add-circle']}
                />
              )}
            <Circle
              state={element?.state}
              letter={element?.value.toString()}
              head={element?.isHead ? HEAD : ''}
              tail={element?.isTail ? TAIL : ''}
              index={index}
              extraClass={'mr-6 ml-6'}
            />
            {(isDeletingHead || isDeletingTail || isDeletingAtIndex) &&
              element?.changingPosition && (
                <Circle
                  state={ElementStates.Changing}
                  letter={element?.value?.toString()}
                  isSmall={true}
                  extraClass={styles['delete-circle']}
                />
              )}
            {element?.isLinked && !element?.isTail && (
              <ArrowIcon/>
            )}
          </div>
        ))}
      </ul>
    </SolutionLayout>
  );
};