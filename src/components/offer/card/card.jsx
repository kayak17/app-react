import { NavLink } from 'react-router-dom';
import {
  AppRoutes,
  OfferTitles,
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
}) => {
  const offerId = offer.id;
  const offerLink = `${AppRoutes.OFFER}?id=${offerId}`;

  return (
    <li className="col mb-3">
      <article className="card border-light text-start">
        <div className="d-flex">
          <div className="offer-card-img-wrapper">
            <div className="position-relative bg-light rounded-start">
              {offer.wifi && (
                <span className="position-absolute top-0 start-0 badge bg-primary app-skewed-neg-15 offer-card-badge">
                  <span>{OfferTitles.FREE_WI_FI}</span>
                </span>
              )}
              <NavLink
                className="d-flex justify-content-center align-items-center w-100 h-100"
                to={offerLink}
              >
                <img
                  className="img-fluid rounded offer-card-img"
                  src={offer.image}
                  alt={OfferTitles.PLACE_IMAGE}
                />
              </NavLink>
            </div>
          </div>
          <div>
            <div className="card-body px-3 py-1">
              <div className="card-text mb-1">
                <b className="fs-5-4">
                  {getOfferCurrency()}&nbsp;{offer.price}
                </b>
                <span className="fs-6-3">
                  &nbsp;{getOfferPricePeriod()}
                </span>
              </div>
              <h6 className="card-title mb-1">
                <NavLink
                  className="text-dark text-decoration-none app-link-opacity app-subtitle fs-5-3"
                  to={offerLink}
                >
                  {offer.title}
                </NavLink>
              </h6>
              <p className="card-text">
                <small className="text-muted fs-6-1">{offer.type}</small>
              </p>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

OfferCard.propTypes = {
  offer: offerPropTypes,
};

export default OfferCard;
