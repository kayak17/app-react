import clsx from 'clsx';
import { getEmptyArray } from '~/utils';
import './list-placeholder.less';

const CitiesListPlaceholder = () => {
  const cityArray = getEmptyArray(5);

  return (
    <nav className="py-3 border-bottom" aria-hidden="true">
      <ul className="list-unstyled px-0 mb-0 d-flex flex-wrap justify-content-evenly">
        {cityArray.map((_, idx) => (
          <li className="placeholder-glow" key={idx}>
            <a
              className={clsx('btn app-skewed-neg-15 disabled placeholder col-6 cities-list-empty-btn', {
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
