import { memo } from 'react';
import PropTypes from 'prop-types';
import CitiesList from '~/components/cities/list/list';
import CitiesListPlaceholder from '~/components/cities/list-placeholder/list-placeholder';
import OffersMap from '~/components/offer/map/map';
import PlacesWrapper from '~/components/places/wrapper/wrapper';
import PlacesWrapperPlaceholder from '~/components/places/wrapper-placeholder/wrapper-placeholder';
import { AppSRTitles } from '~/constants';
import { citiesPropTypes, offersPropTypes, offersReducerPropTypes } from '~/prop-types';
import { throwErrorToBoundary } from '~/utils';
import './content.less';

const PageMainContent = ({
  cities,
  offersMap,
  offersReducer,
  isCitiesError,
  isCitiesLoaded,
  isOffersLoading,
  isOffersError,
  isOffersLoaded,
}) => {
  const getCitiesMarkup = () => {
    if (isCitiesLoaded) {
      return <CitiesList cities={cities} />;
    } else {
      return <CitiesListPlaceholder />;
    }
  };

  const getPlacesMarkup = () => {
    if (!isCitiesError && isOffersLoading) {
      return (
        <PlacesWrapperPlaceholder />
      );
    } else if (isCitiesError || isOffersError) {
      throwErrorToBoundary();
    } else if (isOffersLoaded) {
      return (
        <PlacesWrapper
          offersReducer={offersReducer}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {getCitiesMarkup()}
      <div className="row mx-0 mb-3">
        <h1 className="visually-hidden">
          {AppSRTitles.MAIN_PAGE_PLACES}
        </h1>
        <section className="col-6 overflow-auto main-places-container">
          {getPlacesMarkup()}
        </section>
        <section className="col-6 g-0 main-map-container">
          <OffersMap
            offers={offersMap}
          />
        </section>
      </div>
    </>
  );
};

PageMainContent.propTypes = {
  cities: citiesPropTypes,
  offersMap: offersPropTypes,
  offersReducer: offersReducerPropTypes,
  isCitiesError: PropTypes.bool.isRequired,
  isCitiesLoaded: PropTypes.bool.isRequired,
  isOffersLoading: PropTypes.bool.isRequired,
  isOffersError: PropTypes.bool.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
};

export default memo(PageMainContent);
