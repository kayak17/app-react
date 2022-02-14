import { Link } from 'react-router-dom';
import OffersList from '~/components/offer/list/list';
import { OfferTypes } from '~/constants';
import { offersMapByCityPropTypes } from '~/prop-types';
import { getLocationLinkByCityId } from '~/utils';
import {
  getCitiesFromOffersMapByCity,
  getCityNameByCityId,
  getOffersByCityId,
} from '../helpers';
import './favorites.less';

const FavoritesContent = ({ offersMapByCity }) => {
  return (
    <ul className="d-flex flex-column align-items-center list-unstyled">
      {getCitiesFromOffersMapByCity(offersMapByCity).map((cityId) =>
        <li key={cityId} className="d-flex">
          <div className="favorites-link-container">
            <div>
              <Link
                className="btn btn-primary app-skewed-neg-15 fs-5-3 favorites-link"
                to={getLocationLinkByCityId(cityId)}
              >
                <span>{getCityNameByCityId(offersMapByCity, cityId)}</span>
              </Link>
            </div>
          </div>
          <div className="favorites-offers-container">
            <OffersList
              offers={getOffersByCityId(offersMapByCity, cityId)}
              offerType={OfferTypes.FAVORITE}
            />
          </div>
        </li>
      )}
    </ul>
  );
};

FavoritesContent.propTypes = {
  offersMapByCity: offersMapByCityPropTypes,
};

export default FavoritesContent;
