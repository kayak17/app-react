import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import OffersMap from '~/components/offer/map/map';
import PlacesWrapper from '~/components/places/wrapper/wrapper';
import { AppSRTitles } from '~/constants';
import { offersPropTypes, offersReducerPropTypes } from '~/prop-types';
import './content.less';

const PageMainContent = ({
  offersMap,
  offersReducer,
  isCitiesError,
  isOffersLoading,
  isOffersError,
  isOffersLoaded,
}) => {
  const navigate = useNavigate();

  const handleRedirectToRoute = useCallback((route) => {
    navigate(route);
  }, [navigate]);

  return (
    <>
      <div className="row mx-0">
        <h1 className="visually-hidden">
          {AppSRTitles.MAIN_PAGE_PLACES}
        </h1>
        <section className="col-6 overflow-auto main-places-container">
          <PlacesWrapper
            offersReducer={offersReducer}
            isCitiesError={isCitiesError}
            isOffersError={isOffersError}
            isOffersLoading={isOffersLoading}
            isOffersLoaded={isOffersLoaded}
          />
        </section>
        <section className="col-6 g-0 main-map-container">
          <OffersMap
            offers={offersMap}
            redirectToRoute={handleRedirectToRoute}
          />
        </section>
      </div>
    </>
  );
};

PageMainContent.propTypes = {
  offersMap: offersPropTypes,
  offersReducer: offersReducerPropTypes,
  isCitiesError: PropTypes.bool.isRequired,
  isOffersLoading: PropTypes.bool.isRequired,
  isOffersError: PropTypes.bool.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
};

export default memo(PageMainContent);
