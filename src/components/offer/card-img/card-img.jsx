import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { OfferImgShapes, OfferTitles } from '~/constants';

const OfferCardImg = ({
  offerImage,
  offerLink,
  offerType,
}) => {
  return (
    <NavLink
      className="d-flex justify-content-center align-items-center text-center"
      to={offerLink}
    >
      <img
        className="rounded"
        alt={OfferTitles.PLACE_IMAGE}
        width={OfferImgShapes[offerType].width}
        height={OfferImgShapes[offerType].height}
        src={offerImage}
        loading="lazy"
      />
    </NavLink>
  );
};

OfferCardImg.propTypes = {
  offerImage: PropTypes.string.isRequired,
  offerLink: PropTypes.string.isRequired,
  offerType: PropTypes.string.isRequired,
};

export default OfferCardImg;
