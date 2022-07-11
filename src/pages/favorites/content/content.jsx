import PropTypes from 'prop-types';
import FavoritesContent from '~/components/favorites/content/content';
import FavoritesContentPlaceholder from '~/components/favorites/content-placeholder/content-placeholder';
import { AppTitles, OfferTypes } from '~/constants';
import { getItemOrNullPropTypes, offersPropTypes } from '~/prop-types';
import { getOffersMapByCity } from '../helpers';

const PageFavoritesContent = ({ isLoaded, favoriteOffers }) => {
  if (isLoaded) {
    if (favoriteOffers && favoriteOffers.length) {
      const offersMapByCity = getOffersMapByCity(favoriteOffers);

      return (
        <FavoritesContent
          offersMapByCity={offersMapByCity}
        />
      )
    }

    return (
      <h2 className="app-subtitle">
        {AppTitles.NOTHING_SAVED_YET}
      </h2>
    );
  }

  return (
    <FavoritesContentPlaceholder
      offerType={OfferTypes.FAVORITE}
    />
  );
};

PageFavoritesContent.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  favoriteOffers: getItemOrNullPropTypes(offersPropTypes),
};

export default PageFavoritesContent;
