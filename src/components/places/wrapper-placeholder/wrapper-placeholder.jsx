import { useSelector } from 'react-redux';
import OffersListPlaceholder from '~/components/offer/list-placeholder/list-placeholder';
import { getOffersListType } from '~/modules/main';
import {
  InitialModulesValues,
  OFFERS_LIMIT_PER_PAGE,
  OfferClassesTypes,
} from '~/constants';
import { getEmptyArray } from '~/utils';
import '../places.less';

const PlacesWrapperPlaceholder = () => {
  const dataArray = getEmptyArray(OFFERS_LIMIT_PER_PAGE);
  const offersListType = useSelector(getOffersListType) ||
    InitialModulesValues.OFFERS_LIST_TYPE;

  return (
    <div className="row mt-1 mb-3 mx-0" aria-hidden="true">
      <section className="col-6 text-center overflow-auto places-container placeholder-glow">
        <h2 className="col-6 my-3 bg-secondary app-subtitle placeholder"></h2>
        <div className="col-12 mt-1 mb-3 bg-secondary fs-5-2 app-subtitle placeholder"></div>
        <OffersListPlaceholder
          offers={dataArray}
          offerType={OfferClassesTypes[offersListType]}
        />
      </section>
      <section className="col-6 bg-light text-center places-map-container">

      </section>
    </div>
  );
};

export default PlacesWrapperPlaceholder;
