import clsx from 'clsx';
import { memo } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  getActiveCityId,
  getActiveCityName,
  setActiveCity,
} from '~/modules/main';
import {
  citiesPropTypes,
} from '~/prop-types';
import {
  getLocationLinkByCityId,
} from '~/utils';

const CitiesList = ({ cities }) => {
  const activeCityId = useSelector(getActiveCityId);
  const activeCityName = useSelector(getActiveCityName);
  const dispatch = useDispatch();

  const onLocationClick = (evt, city) => {
    evt.preventDefault();

    if (city.id !== activeCityId) {
      dispatch(setActiveCity(city));
    }
  };

  return (
    <nav className="py-3 border-bottom">
      <ul className="d-flex flex-wrap justify-content-evenly px-0 mb-0 list-unstyled">
        {cities.map((city) => (
          <li key={city.id}>
            <a
              className={clsx('btn app-skewed-neg-15 fs-5-3',
                { 'btn-primary': activeCityName === city.name },
                { 'app-hover-opacity': activeCityName !== city.name }
              )}
              href={getLocationLinkByCityId(city.id)}
              onClick={(evt) => onLocationClick(evt, city)}
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

CitiesList.propTypes = {
  cities: citiesPropTypes,
};

export default memo(CitiesList);
