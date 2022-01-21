import PropTypes from 'prop-types';
import { offersPropTypes } from '~/prop-types';

const PlacesWrapper = ({ offers, activeCityName, offersTotalCount }) => {
  return (
    <>
      <b className="app-subtitle">
        {activeCityName}&nbsp;{offersTotalCount}
      </b>
      {offers.length ? (
        <ul className="list-unstyled">
          {offers.map((offer) => (
            <li key={offer.id}>
              {JSON.stringify(offer)}
            </li>
          ))}
        </ul>
      ) : (
        null
      )}
    </>
  );
};

PlacesWrapper.propTypes = {
  offers: offersPropTypes,
  activeCityName: PropTypes.string.isRequired,
  offersTotalCount: PropTypes.string.isRequired,
};

export default PlacesWrapper;
