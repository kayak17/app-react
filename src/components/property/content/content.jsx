import PropTypes from 'prop-types';
import PropertyFeatures from '../features/features';
import PropertyGallery from '../gallery/gallery';
import ButtonBookmark from '~/components/buttons/bookmark/bookmark';
import RatingStars from '~/components/rating/stars/stars';
import {
  BookmarkBtnTypes,
  OfferTitles,
  RatingTypes,
  OFFER_CURRENCY,
  OFFER_PRICE_PERIOD_NO_SLASH,
} from '~/constants';
import {
  offerPropTypes,
} from '~/prop-types';
import './content.less';

const PropertyContent = ({ offer, offerType }) => {
  return (
    <>
      <PropertyGallery
        offerPhotos={offer.photos}
        offerType={offerType}
      />

      <div className="mb-3">
        <div className="position-relative d-flex align-items-center
          justify-content-center mb-3"
        >
          <b className="position-relative fs-2 fst-italic property-price-value">
            {OFFER_CURRENCY}&nbsp;{offer.price}&nbsp;
          </b>
          <span className="fs-5 fst-italic">
            &nbsp;{OFFER_PRICE_PERIOD_NO_SLASH}
          </span>
          <ButtonBookmark
            offerId={offer.id}
            bookmarkType={BookmarkBtnTypes[offerType]}
          />
        </div>

        <h1 className="mb-3 fs-1 app-title">
          {offer.title}
        </h1>

        <RatingStars
          rating={offer.rating}
          ratingType={RatingTypes[offerType]}
          showValue={true}
        />

        <PropertyFeatures features={offer.features} />

        {offer.wifi && (
          <div className="mb-3">
            <span className="badge bg-primary fs-5-4 fw-bold
              app-skewed-neg-15 property-mark"
            >
              {OfferTitles.FREE_WI_FI}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

PropertyContent.propTypes = {
  offer: offerPropTypes,
  offerType: PropTypes.string.isRequired,
};

export default PropertyContent;
