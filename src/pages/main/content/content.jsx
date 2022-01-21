import { memo } from 'react';
import PropTypes from 'prop-types';
import CitiesList from '~/components/cities/list/list';
import CitiesListEmpty from '~/components/cities/list-empty/list-empty';
import PlacesWrapper from '~/components/places/wrapper/wrapper';
import { AppSRTitles } from '~/constants';
import { throwErrorToBoundary } from '~/utils';
import './content.less';

const PageMainContent = ({
  cities,
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
      return <CitiesListEmpty />;
    }
  };

  const getPlacesMarkup = () => {
    if (!isCitiesError && isOffersLoading) {
      return null;
    } else if (isCitiesError || isOffersError) {
      throwErrorToBoundary();
    } else if (isOffersLoaded) {
      return (
        <div className="row mx-0 mb-3">
          <h1 className="visually-hidden">
            {AppSRTitles.MAIN_PAGE_PLACES}
          </h1>
          <section className="col-6 text-center overflow-auto places-container">
            <PlacesWrapper
              offersReducer={offersReducer}
            />
          </section>
          <section className="col-6 text-center bg-light places-map-container">

          </section>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {getCitiesMarkup()}
      {getPlacesMarkup()}
    </>
  );
};

PageMainContent.propTypes = {
  cities: PropTypes.array.isRequired,
  offersReducer: PropTypes.object.isRequired,
  isCitiesError: PropTypes.bool.isRequired,
  isCitiesLoaded: PropTypes.bool.isRequired,
  isOffersLoading: PropTypes.bool.isRequired,
  isOffersError: PropTypes.bool.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
};

export default memo(PageMainContent);
