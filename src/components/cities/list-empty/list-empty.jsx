import clsx from 'clsx';
import './list-empty.less';

const CitiesListEmpty = () => {
  const cityArray = new Array(5).fill(undefined);

  return (
    <nav className="py-3 mb-3 border-bottom" aria-hidden="true">
      <ul className="list-unstyled px-0 mb-0 d-flex flex-wrap justify-content-evenly">
        {cityArray.map((_, idx) => (
          <li className="placeholder-glow" key={idx}>
            <a
              className={clsx('btn app-skewed-neg-15 disabled placeholder col-6 cities-list-empty-btn', {
                'btn-primary': idx === 0,
                'btn-light': idx !== 0,
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

export default CitiesListEmpty;
