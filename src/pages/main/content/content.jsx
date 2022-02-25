import PropTypes from 'prop-types';
import { memo } from 'react';
import OffersMap from '~/components/offer/map/map';
import PlacesWrapper from '~/components/places/wrapper/wrapper';
import { AppSRTitles } from '~/constants';
import { offersMapPropTypes } from '~/prop-types';
import './content.less';

const PageMainContent = ({
  offersMap,
  isOffersError,
  isOffersLoaded,
}) => {
  return (
    <>
      <div className="row mx-0">
        <h1 className="visually-hidden">
          {AppSRTitles.MAIN_PAGE_PLACES}
        </h1>
        <section className="col-6 g-0 d-flex flex-column text-center
          main-places-container"
        >
          <PlacesWrapper
            isOffersError={isOffersError}
            isOffersLoaded={isOffersLoaded}
          />
        </section>
        <section className="col-6 g-0 main-map-container">
          <OffersMap offers={offersMap} />
        </section>
      </div>
    </>
  );
};

PageMainContent.propTypes = {
  offersMap: offersMapPropTypes,
  isOffersError: PropTypes.bool.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
};

export default memo(PageMainContent);
