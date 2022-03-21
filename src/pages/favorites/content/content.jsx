import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import FavoritesContent from '~/components/favorites/content/content';
import FavoritesContentPlaceholder from '~/components/favorites/content-placeholder/content-placeholder';
import { AppTitles, OfferTypes } from '~/constants';
import { offersMapByCityPropTypes } from '~/prop-types';
import { memo } from 'react';

const PageFavoritesContent = ({ isLoaded, offersMapByCity }) => {
  if (isLoaded) {
    if (offersMapByCity && offersMapByCity.size) {
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
  offersMapByCity: offersMapByCityPropTypes,
};

const arePropsEqual = (prevProps, newProps) => (
  prevProps.isLoaded === newProps.isLoaded &&
  isEqual(prevProps.offersMapByCity, newProps.offersMapByCity)
);

export default memo(PageFavoritesContent, arePropsEqual);
