import { NavLink } from 'react-router-dom';
import {
  AppRoutes,
  OfferTitles,
} from '~/constants';
import {
  offerPropTypes,
} from '~/prop-types';
import {
  getOfferPriceTitle,
} from '~/utils';
import './card.less';

const OfferCard = ({
  offer,
}) => {
  const offerId = offer.id;
  const offerLink = `${AppRoutes.OFFER}?id=${offerId}`;

  return (
    <li className="col mb-3">
      <article className="card border-light text-start">
        <div className="row g-0">
          <div className="col-6">
            <div className="bg-light h-100 rounded-start position-relative">
              {offer.wifi && (
                <span className="position-absolute top-0 start-0 badge app-skewed-neg-15 bg-primary">
                  <span>{OfferTitles.FREE_WI_FI}</span>
                </span>
              )}
              <NavLink
                className="d-flex justify-content-center align-items-center w-100 h-100"
                to={offerLink}
              >
                <img
                  className="img-fluid places-card-img"
                  src={offer.image}
                  alt={OfferTitles.PLACE_IMAGE}
                />
              </NavLink>
            </div>
          </div>
          <div className="col-6">
            <div className="card-body px-3 py-1">
              <div className="card-title mb-1">
                <b className="places-card-price">
                  {getOfferPriceTitle(offer.price)}
                </b>
              </div>
              <h6 className="card-text mb-1">
                <NavLink
                  className="text-dark text-decoration-none places-card-title app-subtitle"
                  to={offerLink}
                >
                  {offer.title}
                </NavLink>
              </h6>
              <p className="card-text"><small className="text-muted fs-6">{offer.type}</small></p>
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
