import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageFavoritesContentPlaceholder from '../content-placeholder/content-placeholder';
import OffersList from '~/components/offer/list/list';
import { AppTitles, OfferTypes } from '~/constants';
import { getItemOrNullPropTypes } from '~/prop-types';
import {
  getLocationLinkByCityId,
} from '~/utils';
import {
  getCitiesFromOffersMapByCity,
  getCityNameByCityId,
  getOffersByCityId,
} from '../helpers';
import './content.less';

const PageFavoritesContent = ({ isLoaded, offerIdsLength, offersMapByCity }) => {
  const canShowPlaceholder = Boolean(offerIdsLength);

  return (
    <section className="page-content-wrapper">
      <h1 className="app-title page-content-title">{AppTitles.SAVED_LISTING}</h1>
      {isLoaded ? (
        offersMapByCity && offersMapByCity.size ? (
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
        ) : (
          <h2 className="app-subtitle">{AppTitles.NOTHING_SAVED_YET}</h2>
        )
      ) : (
        canShowPlaceholder && (
          <PageFavoritesContentPlaceholder
            offerType={OfferTypes.FAVORITE}
          />
        )
      )}
    </section>
  );
};

PageFavoritesContent.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  offerIdsLength: PropTypes.number.isRequired,
  offersMapByCity: getItemOrNullPropTypes(
    PropTypes.instanceOf(Map).isRequired
  ),
};

export default PageFavoritesContent;
