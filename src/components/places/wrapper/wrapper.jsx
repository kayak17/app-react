import { useSelector } from 'react-redux';
import { getActiveCityName } from '~/modules/main';
import { offersPropTypes } from '~/prop-types';

const PlacesWrapper = ({ offers }) => {
  const activeCityName = useSelector(getActiveCityName);

  return (
    <>
      <b className="app-subtitle">
        {activeCityName}
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
};

export default PlacesWrapper;
