import PropTypes from 'prop-types';
import { memo } from 'react';
import { AppTitles } from '~/constants';
import './counter-item.less';

const CounterItem = ({
  id: counterId,
  value: counterValue,
  onRemoveCounter,
  onDecrementCounter,
  onIncrementCounter,
}) => {
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
          className="btn btn-outline-secondary btn-remove-counter"
          onClick={(evt) => onRemoveCounter(evt, counterId)}
        >
          {AppTitles.REMOVE_SIGN}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={(evt) => onDecrementCounter(evt, counterId)}
        >
          {AppTitles.DEC_SIGN}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={(evt) => onIncrementCounter(evt, counterId)}
        >
          {AppTitles.INC_SIGN}
        </button>
      </div>
    </li>
  );
}

CounterItem.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onRemoveCounter: PropTypes.func.isRequired,
  onDecrementCounter: PropTypes.func.isRequired,
  onIncrementCounter: PropTypes.func.isRequired,
};

export default memo(CounterItem);
