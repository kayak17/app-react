import clsx from 'clsx';
import { CITIES_COUNT_PLACEHOLDER } from '~/constants';
import { getArrayOfUndefineds } from '~/utils';
import './list-placeholder.less';

const CitiesListPlaceholder = () => {
  const cityArray = getArrayOfUndefineds(CITIES_COUNT_PLACEHOLDER);

  return (
    <nav className="py-3 border-bottom" aria-hidden="true">
      <ul className="d-flex flex-wrap justify-content-evenly px-0 mb-0 list-unstyled">
        {cityArray.map((_, idx) => (
          <li className="placeholder-glow" key={idx}>
            <a
              className={clsx('col-6 btn disabled placeholder app-skewed-neg-15 cities-list-empty-btn fs-5-3', {
                'btn-primary': idx === 0,
                'btn-secondary': idx !== 0,
              })}
              tabIndex="-1"
            >
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CitiesListPlaceholder;
