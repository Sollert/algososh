import {FormEvent, useMemo, useState} from "react";

import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";

import {delay, swap} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";
import { DataElement } from "../../types/types";

import styles from './string-page.module.css';

export const StringPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isResultMounted, setResultIsMounted] = useState(false);
  const [resultArray, setResultArray] = useState<(DataElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputChangeHandler = (evt: FormEvent) => {
    const target = evt.target as HTMLInputElement;
    if (target) {
      setInputValue(target.value)
    }
  }

  const inputValueIsEmpty = useMemo(() => {
    return inputValue === ''
  }, [inputValue])

  const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setResultIsMounted(true);
    setInputValue('');
    setIsLoading(true);

    const newArray = inputValue.split('').map(item => {
      return {
        value: item,
        state: ElementStates.Default
      }
    });

    let start = 0;
    let end = newArray.length - 1;

    while (start <= end) {
      newArray[start].state = ElementStates.Changing;
      newArray[end].state = ElementStates.Changing;
      setResultArray([...newArray]);

      swap(newArray, start, end);

      await delay();
      setResultArray([...newArray]);
      newArray[start].state = ElementStates.Modified;
      newArray[end].state = ElementStates.Modified;

      start++
      end--
    }

    setIsLoading(false);
  }

  return (
    <SolutionLayout title="Строка">
      <section className={styles['section']}>
        <form className={styles['form-container']} onSubmit={onSubmitHandler}>
          <Input maxLength={11} isLimitText value={inputValue} onChange={inputChangeHandler}/>
          <Button text={'Развернуть'} type={"submit"} isLoader={isLoading}
                  disabled={isLoading || inputValueIsEmpty}/>
        </form>
        {isResultMounted && <div className={styles['list-container']}>
          {resultArray.map((letter, index) => {
            return <Circle letter={letter?.value.toString()} key={index} state={letter?.state}/>
          })}
        </div>}
      </section>
    </SolutionLayout>
  );
};
