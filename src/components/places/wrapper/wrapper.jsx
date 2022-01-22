import OffersList from '~/components/offer/list/list';
import { OfferTitles } from '~/constants';
import { offersReducerPropTypes } from '~/prop-types';

const PlacesWrapper = ({ offersReducer }) => {
  const activeCityName = offersReducer.activeCityName;
  const totalCount = offersReducer.totalCount;
  const data = offersReducer.data;

  const getTitle = () => {
    if (data.length) {
      return `${totalCount}${OfferTitles.PLACES_TO_STAY_IN}${activeCityName}`;
    }

    return `${OfferTitles.NO_PLACES_TO_STAY_IN}${activeCityName}`;
  };

  return (
    <>
      <h2 className="mt-2 mb-3 app-subtitle">
        {getTitle()}
      </h2>
      {data.length ? (
        <OffersList
          offers={data}
        />
      ) : (
        null
      )}
    </>
  );
};

PlacesWrapper.propTypes = {
  offersReducer: offersReducerPropTypes,
};

export default PlacesWrapper;
