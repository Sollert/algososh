import {useEffect, useState} from "react";

import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {RadioInput} from "../../components/ui/radio-input/radio-input";
import {Button} from "../../components/ui/button/button";
import {Column} from "../../components/ui/column/column";

import {ElementStates} from "../../types/element-states";
import {SortingElement} from "../../types/sortingTypes";
import {Direction} from "../../types/direction";

import {delay, getRandomNumber, getSortSteps,} from "../../utils/utils";

import styles from './sorting-page.module.css';

export const SortingPage = () => {
  const [array, setArray] = useState<(SortingElement | null)[]>([])
  const [isAscending, setIsAscending] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [sortAlgorithm, setSortAlgorithm] = useState<string>(
    'выбор',
  );

  useEffect(() => {
    setSortAlgorithm('выбор');
    generateRandomArray();
  }, []);


  const generateRandomArray = () => {
    const minLength = 3;
    const maxLength = 17;
    const minValue = 0;
    const maxValue = 100;
    const arrayLength = getRandomNumber(minLength, maxLength);
    const randomArray = Array.from({length: arrayLength}, () => ({
      value: getRandomNumber(minValue, maxValue),
      state: ElementStates.Default,
    }));
    setArray([...randomArray]);
  };

  const showSort = async (isAscending: boolean) => {
    const steps = getSortSteps(
      array ? [...array] : [],
      isAscending,
      sortAlgorithm
    );
    let currentStep = 0;
    while (currentStep < steps.length) {
      if (steps) {
        await delay();
        setArray([...steps[currentStep]])
        currentStep++;
      }
    }
  }

  const sortArray = async (isAscending: boolean) => {
    setInProgress(true);
    await showSort(isAscending);
    setInProgress(false);
  };

  const handleSortClick = async (direction: Direction) => {
    setIsAscending(direction === Direction.Ascending);
    setIsAscending((state) => {
      sortArray(state);
      return state;
    });
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <section>
        <form className={styles['form-container']}>
          <fieldset className={styles['radio-inputs']}>
            <RadioInput
              name='radio'
              label='Выбор'
              value='selection'
              checked={sortAlgorithm === 'выбор'}
              onChange={() => setSortAlgorithm('выбор')}
              disabled={inProgress}
            />
            <RadioInput
              name='radio'
              label='Пузырек'
              value='bubble'
              checked={sortAlgorithm === 'пузырёк'}
              onChange={() => setSortAlgorithm('пузырёк')}
              disabled={inProgress}
            />
          </fieldset>
          <div className={styles['buttons']}>
            <Button
              text='По возрастанию'
              sorting={Direction.Ascending}
              extraClass={`mr-12 ${styles['button']}`}
              disabled={inProgress}
              isLoader={inProgress && isAscending}
              onClick={() => handleSortClick(Direction.Ascending)}
            />
            <Button
              text='По убыванию'
              sorting={Direction.Descending}
              extraClass={`mr-40 ${styles.button}`}
              disabled={inProgress}
              isLoader={inProgress && !isAscending}
              onClick={() => handleSortClick(Direction.Descending)}
            />
            <Button
              type={'reset'}
              text='Новый массив'
              onClick={generateRandomArray}
              disabled={inProgress}
            />
          </div>
        </form>
        <div className={styles['bars']}>
          {array?.map((element, index) => (
            <Column
              index={parseInt(element!.value.toString())}
              state={element?.state}
              key={index}
            />
          ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
