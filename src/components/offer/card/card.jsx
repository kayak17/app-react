import clsx from 'clsx';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OfferCardImg from '../card-img/card-img';
import ButtonBookmark from '~/components/buttons/bookmark/bookmark';
import RatingStars from '~/components/rating/stars/stars';
import { getActivePinId } from '~/modules/offers-map';
import {
  AppRoutes,
  BookmarkBtnTypes,
  OfferClasses,
  OfferTitles,
  RatingTypes,
  OFFER_CURRENCY,
  OFFER_PRICE_PERIOD,
} from '~/constants';
import {
  offerPropTypes,
} from '~/prop-types';
import '../offer.less';

const OfferCard = ({
  offer,
  offerType,
  handleOfferCardMouseEnter = () => false,
  handleOfferCardMouseLeave = () => false,
}) => {
  const offerId = offer.id;
  const offerLink = `${AppRoutes.OFFER}?id=${offerId}`;
  const activePinId = useSelector(getActivePinId);

  return (
    <li
      className={clsx(`${OfferClasses[offerType]['li']} pb-3 app-hover-opacity`,
        { 'app-opacity': activePinId === offerId }
      )}
      onMouseEnter={handleOfferCardMouseEnter}
      onMouseLeave={handleOfferCardMouseLeave}
    >
      <article className="card border-light text-start">
        <div className={`${OfferClasses[offerType]['container']} d-flex`}>
          <div>
            <div className="position-relative bg-light rounded">
              {offer.wifi && (
                <span className="position-absolute top-0 start-0 badge bg-primary
                  app-skewed-neg-15 offer-card-badge"
                >
                  <span>{OfferTitles.FREE_WI_FI}</span>
                </span>
              )}
              <OfferCardImg
                offerImage={offer.image}
                offerLink={offerLink}
                offerType={offerType}
              />
            </div>
          </div>
          <div className={`${OfferClasses[offerType]['info']} card-body py-1`}>
            <div className="d-flex align-items-center card-text mb-1">
              <b className="fs-5-4">
                {OFFER_CURRENCY}&nbsp;{offer.price}
              </b>
              <span className="fs-6-3">
                &nbsp;{OFFER_PRICE_PERIOD}
              </span>
              <ButtonBookmark
                offerId={offerId}
                bookmarkType={BookmarkBtnTypes.MAIN}
              />
            </div>
            <div className="card-text mb-1">
              <RatingStars
                rating={offer.rating}
                ratingType={RatingTypes.CARD}
              />
            </div>
            <h6 className="card-title mb-1">
              <NavLink
                className="text-dark text-decoration-none
                  app-hover-opacity app-trasition app-subtitle fs-5-3"
                to={offerLink}
              >
                {offer.title}
              </NavLink>
            </h6>
            <p className="card-text">
              <small className="text-muted fs-6-2">{offer.type}</small>
            </p>
          </div>
        </div>
      </article>
    </li>
  );
};

OfferCard.propTypes = {
  offer: offerPropTypes,
  offerType: PropTypes.string.isRequired,
  handleOfferCardMouseEnter: PropTypes.func,
  handleOfferCardMouseLeave: PropTypes.func,
};

export default OfferCard;
