import {FormEvent, useMemo, useState} from "react";

import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";

import {FIBONACCI_MAX_INDEX} from "../../constants/numbers";
import {delay, getFibonacciSteps} from "../../utils/utils";

import styles from './fibonacci-page.module.css';

export const FibonacciPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isResultMounted, setResultIsMounted] = useState(false);
  const [resultArray, setResultArray] = useState<number[]>([]);
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

  const getFibonacci = async (num: number) => {
    const fibonacciSteps = getFibonacciSteps(num);
    let step = 0;

    while (step < fibonacciSteps.length) {
      await delay();
      setResultArray([...fibonacciSteps[step]])
      step++
    }
  };

  const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setResultIsMounted(true);
    setInputValue('');
    setIsLoading(true);

    await getFibonacci(Number(inputValue))

    setIsLoading(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section>
        <form className={styles['form-container']} onSubmit={onSubmitHandler}>
          <Input type="number" min={1} max={FIBONACCI_MAX_INDEX} value={inputValue}
                 onChange={inputChangeHandler} data-cy="input-value"/>
          <Button text={'Рассчитать'} type={"submit"} isLoader={isLoading}
                  disabled={isLoading || inputValueIsEmpty}/>
        </form>
        {isResultMounted && <div className={styles['list-container']}>
          {resultArray.map((item, index) => {
            return <Circle letter={item.toString()} key={index} index={index}/>
          })}
        </div>}
      </section>
    </SolutionLayout>
  );
};
