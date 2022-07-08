import PropTypes from 'prop-types';
import { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { incrementCounter } from '~/modules/counters';
import { AppTitles } from '~/constants';

const CounterSpecial = ({
  id: counterId,
  value: counterValue,
  onRemoveCounter,
}) => {
  const dispatch = useDispatch();
  const intervalRef = useRef();

  useEffect(() => {
    const idx = setInterval(() => {
      dispatch(incrementCounter(counterId));
    }, 1000);

    intervalRef.current = idx;

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [counterId, dispatch]);

  return (
    <li className="btn-toolbar mb-3">
      <div className="input-group me-2">
        <div className="input-group-text">
          {counterValue}
        </div>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={(evt) => onRemoveCounter(evt, counterId)}
        >
          {AppTitles.REMOVE_SIGN}
        </button>
      </div>
    </li>
  );
}

CounterSpecial.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onRemoveCounter: PropTypes.func.isRequired,
};

export default memo(CounterSpecial);
