import isEqual from 'lodash/isEqual';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '../counter/counter';
import CounterSpecial from '../counter-special/counter-special';
import {
  getCounters,
  removeCounter,
  decrementCounter,
  incrementCounter,
} from '~/modules/counters';

const CounterList = () => {
  const dispatch = useDispatch();
  const counters = useSelector(getCounters, isEqual);

  const onRemoveCounter = useCallback((evt, itemId) => {
    evt.preventDefault();
    dispatch(removeCounter(itemId));
  }, [dispatch]);

  const onDecrementCounter = useCallback((evt, itemId) => {
    evt.preventDefault();
    dispatch(decrementCounter(itemId));
  }, [dispatch]);

  const onIncrementCounter = useCallback((evt, itemId) => {
    evt.preventDefault();
    dispatch(incrementCounter(itemId));
  }, [dispatch]);

  const countersMarkup = counters.map((item) => {
    if (item.isSpecial) {
      return (
        <CounterSpecial
          key={item.id}
          id={item.id}
          value={item.value}
          onRemoveCounter={onRemoveCounter}
          onIncrementCounter={onIncrementCounter}
        />
      );
    }

    return (
      <Counter
        key={item.id}
        id={item.id}
        value={item.value}
        onRemoveCounter={onRemoveCounter}
        onDecrementCounter={onDecrementCounter}
        onIncrementCounter={onIncrementCounter}
      />
    );
  });

  return (
    <ul className="list-unstyled">
      {countersMarkup}
    </ul>
  );
}

export default CounterList;
