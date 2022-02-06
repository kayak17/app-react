import PropTypes from 'prop-types';
import OffersListPlaceholder from '~/components/offer/list-placeholder/list-placeholder';
import { OFFERS_LIMIT_PER_PAGE, OfferClassesTypes } from '~/constants';
import { getEmptyArray } from '~/utils';

const PlacesContentPlaceholder = ({ offersListType }) => {
  const dataArray = getEmptyArray(OFFERS_LIMIT_PER_PAGE);

  return (
    <div
      className="mt-1 text-center placeholder-glow"
      aria-hidden="true"
    >
      <h2 className="col-6 my-3 bg-secondary app-subtitle placeholder"></h2>
      <div className="col-11 mt-1 mb-3 bg-secondary fs-5-2 app-subtitle placeholder"></div>
      <OffersListPlaceholder
        offers={dataArray}
        offerType={OfferClassesTypes[offersListType]}
      />
    </div>
  );
};

PlacesContentPlaceholder.propTypes = {
  offersListType: PropTypes.string.isRequired,
};

export default PlacesContentPlaceholder;
