import PropTypes from 'prop-types';
import PropertyFeaturesPlaceholder from '~/components/property/features-placeholder/features-placeholder';
import RatingStarsPlaceholder from '~/components/rating/stars-placeholder/stars-placeholder';
import {
  ROOM_MAX_PHOTOS_COUNT,
  OfferImgShapes,
  RatingTypes,
} from '~/constants';
import { getEmptyArray } from '~/utils';
import '../content/content.less';
import '~/components/property/content/content.less';

const PageRoomContentPlaceholder = ({ offerType }) => {
  const dataArray = getEmptyArray(ROOM_MAX_PHOTOS_COUNT);

  return (
    <section className="mt-4 ms-auto me-auto mb-3 text-center
      property-container placeholder-glow"
    >
      <div className="d-flex flex-wrap justify-content-between mb-4
        property-gallery"
      >
        {dataArray.map((_, idx) => (
          <div
            key={idx}
            className="rounded placeholder"
            style={{
              width: `${OfferImgShapes[offerType].width}px`,
              height: `${OfferImgShapes[offerType].height}px`,
            }}
          >
          </div>
        ))}
      </div>

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
    </section>
  );
};

PageRoomContentPlaceholder.propTypes = {
  offerType: PropTypes.string.isRequired,
};

export default PageRoomContentPlaceholder;
