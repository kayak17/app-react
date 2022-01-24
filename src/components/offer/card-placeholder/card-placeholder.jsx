import PropTypes from 'prop-types';
import { OfferClasses } from '~/constants';
import '../offer.less';

const OfferCardPlaceholder = ({ offerType }) => {
  return (
    <li className={`${OfferClasses[offerType]['li']} mb-3`}>
      <article className="card border-light text-start">
        <div className={`${OfferClasses[offerType]['container']} d-flex`}>
          <div>
            <div className={`${OfferClasses[offerType]['img']} h-100 bg-secondary rounded placeholder`}></div>
          </div>
          <div className={`${OfferClasses[offerType]['info']} card-body py-1`}>
            <div className="card-text mb-1 placeholder-glow">
              <span className="col-5 bg-secondary fs-5-4 placeholder"></span>
            </div>
            <div className="card-text mb-1 placeholder-glow">
              <span className="col-4 bg-secondary fs-5-4 placeholder"></span>
            </div>
            <h6 className="card-title mb-1 placeholder-glow">
              <span className="col-8 bg-secondary placeholder fs-5-3"></span>
            </h6>
            <p className="card-text placeholder-glow">
              <small className="col-4 bg-secondary fs-6-2 placeholder"></small>
            </p>
          </div>
        </div>
      </article>
    </li>
  );
};

OfferCardPlaceholder.propTypes = {
  offerType: PropTypes.string.isRequired,
};

export default OfferCardPlaceholder;
