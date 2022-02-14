import PropTypes from 'prop-types';
import PropertyFeaturesPlaceholder from '../features-placeholder/features-placeholder';
import PropertyGalleryPlaceholder from '../gallery-placeholder/gallery-placeholder';
import RatingStarsPlaceholder from '~/components/rating/stars-placeholder/stars-placeholder';
import { RatingTypes } from '~/constants';

const PropertyContentPlaceholder = ({ offerType }) => {
  return (
    <>
      <PropertyGalleryPlaceholder offerType={offerType} />

      <div className="mt-4 mb-3 py-2">
        <div className="d-flex align-items-center justify-content-center mb-3">
          <b className="col-2 fs-2 placeholder"></b>
        </div>

        <h1 className="col-8 mt-3 mb-3 fs-1 app-title placeholder"></h1>

        <RatingStarsPlaceholder
          ratingType={RatingTypes.ROOM}
          showValue={true}
        />

        <div className="mt-3">
          <PropertyFeaturesPlaceholder />
        </div>

        <div className="mt-3 mb-3 py-1">
          <span className="col-3 btn bg-primary fs-5-4 fw-bold disabled
            app-skewed-neg-15 property-mark property-mark-placeholder placeholder"
          ></span>
        </div>
      </div>
    </>
  );
};

PropertyContentPlaceholder.propTypes = {
  offerType: PropTypes.string.isRequired,
};

export default PropertyContentPlaceholder;
