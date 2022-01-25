import PropTypes from 'prop-types';
import OffersList from '~/components/offer/list/list';
import FormFilters from '../form-filters/form-filters';
import { OfferClassesTypes, OfferTitles } from '~/constants';
import { offersReducerPropTypes } from '~/prop-types';

const PlacesContent = ({ offersReducer, offersListType }) => {
  const activeCityName = offersReducer.activeCityName;
  const totalCount = offersReducer.totalCount;
  const offers = offersReducer.data;

  const getTitle = () => {
    if (offers.length) {
      return `${totalCount}${OfferTitles.PLACES_TO_STAY_IN}${activeCityName}`;
    }

    return `${OfferTitles.NO_PLACES_TO_STAY_IN}${activeCityName}`;
  };

  return (
    <div className="text-center">
      <h2 className="px-5 my-3 app-subtitle">
        {getTitle()}
      </h2>
      {offers.length ? (
        <>
          <FormFilters />
          <OffersList
            offers={offers}
            offerType={OfferClassesTypes[offersListType]}
          />
        </>
      ) : (
        null
      )}
    </div>
  );
};

PlacesContent.propTypes = {
  offersReducer: offersReducerPropTypes,
  offersListType: PropTypes.string.isRequired,
};

export default PlacesContent;
