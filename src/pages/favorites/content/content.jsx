import PropTypes from 'prop-types';
import FavoritesContent from '~/components/favorites/content/content';
import FavoritesContentPlaceholder from '~/components/favorites/content-placeholder/content-placeholder';
import { AppTitles, OfferTypes } from '~/constants';
import { offersMapByCityPropTypes } from '~/prop-types';

const PageFavoritesContent = ({ isLoaded, offerIdsLength, offersMapByCity }) => {
  const canShowPlaceholder = Boolean(offerIdsLength);

  if (isLoaded) {
    if (offersMapByCity && offersMapByCity.size) {
      return (
        <FavoritesContent
          offersMapByCity={offersMapByCity}
        />
      )
    }

    return (
      <h2 className="app-subtitle">{AppTitles.NOTHING_SAVED_YET}</h2>
    );
  } else if (canShowPlaceholder) {
    return (
      <FavoritesContentPlaceholder
        offerType={OfferTypes.FAVORITE}
      />
    );
  }

  return null;
};

PageFavoritesContent.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  offerIdsLength: PropTypes.number.isRequired,
  offersMapByCity: offersMapByCityPropTypes,
};

export default PageFavoritesContent;
