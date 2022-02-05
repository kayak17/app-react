import PropTypes from 'prop-types';
import { memo } from 'react';
import OffersMap from '~/components/offer/map/map';
import PlacesWrapper from '~/components/places/wrapper/wrapper';
import useRouterNavigate from '~/hooks/use-router-navigate/use-router-navigate';
import { AppSRTitles } from '~/constants';
import {
  offersPropTypes,
  offersReducerPropTypes,
  refPropTypes,
} from '~/prop-types';
import './content.less';

const PageMainContent = ({
  offersMap,
  offersReducer,
  isCitiesError,
  isOffersLoading,
  isOffersError,
  isOffersLoaded,
  scrollContainer,
  setScrolledOffers,
}) => {
  const redirectToRoute = useRouterNavigate();

  return (
    <>
      <div className="row mx-0">
        <h1 className="visually-hidden">
          {AppSRTitles.MAIN_PAGE_PLACES}
        </h1>
        <section className="col-6 g-0 d-flex flex-column text-center main-places-container">
          <PlacesWrapper
            offersReducer={offersReducer}
            isCitiesError={isCitiesError}
            isOffersError={isOffersError}
            isOffersLoading={isOffersLoading}
            isOffersLoaded={isOffersLoaded}
            scrollContainer={scrollContainer}
            setScrolledOffers={setScrolledOffers}
          />
        </section>
        <section className="col-6 g-0 main-map-container">
          <OffersMap
            offers={offersMap}
            redirectToRoute={redirectToRoute}
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
  scrollContainer: refPropTypes,
  setScrolledOffers: PropTypes.func.isRequired,
};

export default memo(PageMainContent);
