import PropTypes from 'prop-types';
import { memo } from 'react';
import OffersMapContainer from '~/components/offer/map-container/map-container';
import PlacesWrapper from '~/components/places/wrapper/wrapper';
import { AppSRTitles } from '~/constants';
import './content.less';

const PageMainContent = ({
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
          <OffersMapContainer />
        </section>
      </div>
    </>
  );
};

PageMainContent.propTypes = {
  isOffersError: PropTypes.bool.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
};

export default memo(PageMainContent);
