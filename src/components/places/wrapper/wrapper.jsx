import PropTypes from 'prop-types';

const PlacesWrapper = ({ offersReducer }) => {
  const activeCityName = offersReducer.activeCityName;
  const totalCount = offersReducer.totalCount;
  const data = offersReducer.data;

  return (
    <>
      <b className="app-subtitle">
        {activeCityName}&nbsp;{totalCount}
      </b>
      {data.length ? (
        <ul className="list-unstyled">
          {data.map((offer) => (
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
  offersReducer: PropTypes.object.isRequired,
};

export default PlacesWrapper;
