import clsx from 'clsx';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '~/components/rating/stars/stars';
import { getActivePinId, setActiveOffer } from '~/modules/offers-map';
import {
  AppRoutes,
  OfferClasses,
  OfferImgShapes,
  OfferTitles,
  RatingTypes,
  InitialModulesValues,
} from '~/constants';
import {
  offerPropTypes,
} from '~/prop-types';
import {
  getOfferCurrency,
  getOfferPricePeriod,
} from '~/utils';
import '../offer.less';

const OfferCard = ({
  offer,
  offerType,
}) => {
  const offerId = offer.id;
  const offerLink = `${AppRoutes.OFFER}?id=${offerId}`;
  const activePinId = useSelector(getActivePinId);
  const dispatch = useDispatch();

  const handleOfferCardMouseEnter = () => {
    dispatch(setActiveOffer(offer));
  };

  const handleOfferCardMouseLeave = () => {
    dispatch(setActiveOffer(InitialModulesValues.ACTIVE_OFFER));
  };

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
              <NavLink
                className="d-flex justify-content-center align-items-center text-center"
                to={offerLink}
              >
                <img
                  className="rounded"
                  alt={OfferTitles.PLACE_IMAGE}
                  width={OfferImgShapes[offerType].width}
                  height={OfferImgShapes[offerType].height}
                  src={offer.image}
                  loading="lazy"
                />
              </NavLink>
            </div>
          </div>
          <div className={`${OfferClasses[offerType]['info']} card-body py-1`}>
            <div className="card-text mb-1">
              <b className="fs-5-4">
                {getOfferCurrency()}&nbsp;{offer.price}
              </b>
              <span className="fs-6-3">
                &nbsp;{getOfferPricePeriod()}
              </span>
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
};

export default OfferCard;
