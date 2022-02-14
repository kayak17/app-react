import PropTypes from 'prop-types';
import { OfferImgShapes, OfferTitles } from '~/constants';
import './gallery.less';

const PropertyGallery = ({ offerPhotos, offerType }) => {
  return (
    <div className="d-flex flex-wrap justify-content-between mb-4
      property-gallery"
    >
      {offerPhotos.map((item) => (
        <div key={item}>
          <img
            className="rounded"
            alt={OfferTitles.PLACE_IMAGE}
            width={OfferImgShapes[offerType].width}
            height={OfferImgShapes[offerType].height}
            src={item}
          />
        </div>
      ))}
    </div>
  );
};

PropertyGallery.propTypes = {
  offerPhotos: PropTypes.arrayOf(PropTypes.string).isRequired,
  offerType: PropTypes.string.isRequired,
};

export default PropertyGallery;
