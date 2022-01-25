import { useSelector } from 'react-redux';
import OffersListPlaceholder from '~/components/offer/list-placeholder/list-placeholder';
import { getOffersListType } from '~/modules/main';
import {
  InitialModulesValues,
  OFFERS_LIMIT_PER_PAGE,
  OfferClassesTypes,
} from '~/constants';
import { getEmptyArray } from '~/utils';

const PlacesWrapperPlaceholder = () => {
  const dataArray = getEmptyArray(OFFERS_LIMIT_PER_PAGE);
  const offersListType = useSelector(getOffersListType) ||
    InitialModulesValues.OFFERS_LIST_TYPE;

  return (
    <div
      className="mt-1 text-center placeholder-glow"
      aria-hidden="true"
    >
      <h2 className="col-6 my-3 bg-secondary app-subtitle placeholder"></h2>
      <div className="col-12 mt-1 mb-3 bg-secondary fs-5-2 app-subtitle placeholder"></div>
      <OffersListPlaceholder
        offers={dataArray}
        offerType={OfferClassesTypes[offersListType]}
      />
    </div>
  );
};

export default PlacesWrapperPlaceholder;
