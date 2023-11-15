import {FormEvent, useCallback, useMemo, useState} from "react";

import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";

import {STRING_INPUT_MAX_LENGTH} from "../../constants/numbers";

import {getReversingStringSteps, delay, getLetterState} from "../../utils/utils";

import styles from './string-page.module.css';

export const StringPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isResultMounted, setResultIsMounted] = useState(false);
  const [resultArray, setResultArray] = useState<({
    arr: string[];
    step: number;
  } | null)>(null);
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

  const onSubmitHandler = useCallback(async (evt) => {
    evt.preventDefault();

    setResultIsMounted(true)
    setIsLoading(true);

    const array = getReversingStringSteps(inputValue);
    if (!array) return;

    let step = 0;
    setResultArray({arr: array[step], step: 0});

    while (step < array.length) {
      await delay();
      setResultArray({arr: array[step], step});
      step++;
    }

    setIsLoading(false);
    setInputValue('');
  }, [inputValue]);

  return (
    <SolutionLayout title="Строка">
      <section className={styles['section']}>
        <form className={styles['form-container']} onSubmit={onSubmitHandler}>
          <Input maxLength={STRING_INPUT_MAX_LENGTH} isLimitText value={inputValue}
                 onChange={inputChangeHandler} disabled={isLoading}/>
          <Button text={'Развернуть'} type={"submit"} isLoader={isLoading}
                  disabled={isLoading || inputValueIsEmpty}/>
        </form>
        {isResultMounted && <div className={styles['list-container']}>
          {resultArray?.arr.map((letter, index) => {
            return <Circle letter={letter} key={index}
                           state={getLetterState(index, resultArray.step, resultArray.arr.length)}/>
          })}
        </div>}
      </section>
    </SolutionLayout>
  );
};
