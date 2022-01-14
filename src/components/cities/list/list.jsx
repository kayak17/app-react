import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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

const CitiesList = ({
  cities,
  onSetActiveCity,
}) => {
  const activeCityId = useSelector(getActiveCityId);
  const activeCityName = useSelector(getActiveCityName);
  const dispatch = useDispatch();

  const onLocationClick = (evt, city) => {
    evt.preventDefault();

    if (city.id !== activeCityId) {
      dispatch(setActiveCity(city));
      onSetActiveCity(city);
    }
  };

  return (
    <nav className="py-3 mb-3 border-bottom">
      <ul className="list-unstyled px-0 mb-0 d-flex flex-wrap justify-content-evenly">
        {cities.map((city) => (
          <li key={city.id}>
            <a
              className={clsx('btn app-skewed-neg-15',
                { 'btn-primary': activeCityName === city.name }
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
  onSetActiveCity: PropTypes.func.isRequired,
};

export default CitiesList;
