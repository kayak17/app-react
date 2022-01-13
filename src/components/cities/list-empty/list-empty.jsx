import './list-empty.less';

const CitiesListEmpty = () => {
  const cityArray = new Array(5).fill(undefined);

  return (
    <nav className="py-3 mb-3 border-bottom" aria-hidden="true">
      <ul className="list-unstyled px-0 mb-0 d-flex flex-wrap justify-content-evenly">
        {cityArray.map((_, idx) => (
          <li className="placeholder-glow" key={idx}>
            <a
              className="btn px-0 disabled city-list-empty-btn"
              tabIndex="-1"
            >
              <span className="placeholder col-12"></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CitiesListEmpty;
