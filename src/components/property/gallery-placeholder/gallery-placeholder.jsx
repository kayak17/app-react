import PropTypes from 'prop-types';
import { ROOM_MAX_PHOTOS_COUNT, OfferImgShapes } from '~/constants';
import { getArrayOfUndefineds } from '~/utils';
import '../gallery/gallery.less';

const PropertyGalleryPlaceholder = ({ offerType }) => {
  const dataArray = getArrayOfUndefineds(ROOM_MAX_PHOTOS_COUNT);

  return (
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

  );
};

PropertyGalleryPlaceholder.propTypes = {
  offerType: PropTypes.string.isRequired,
};

export default PropertyGalleryPlaceholder;
