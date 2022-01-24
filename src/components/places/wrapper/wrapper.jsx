import { useSelector } from 'react-redux';
import OffersList from '~/components/offer/list/list';
import FormFilters from '../form-filters/form-filters';
import { getOffersListType } from '~/modules/main';
import {
  AppSRTitles,
  InitialModulesValues,
  OfferClassesTypes,
  OfferTitles,
} from '~/constants';
import { offersReducerPropTypes } from '~/prop-types';
import '../places.less';

const PlacesWrapper = ({ offersReducer }) => {
  const activeCityName = offersReducer.activeCityName;
  const totalCount = offersReducer.totalCount;
  const data = offersReducer.data;
  const offersListType = useSelector(getOffersListType) ||
    InitialModulesValues.OFFERS_LIST_TYPE;

  const getTitle = () => {
    if (data.length) {
      return `${totalCount}${OfferTitles.PLACES_TO_STAY_IN}${activeCityName}`;
    }

    return `${OfferTitles.NO_PLACES_TO_STAY_IN}${activeCityName}`;
  };

  return (
    <div className="row mx-0 mb-3">
      <h1 className="visually-hidden">
        {AppSRTitles.MAIN_PAGE_PLACES}
      </h1>
      <section className="col-6 text-center overflow-auto places-container">
        <h2 className="px-5 my-3 app-subtitle">
          {getTitle()}
        </h2>
        {data.length ? (
          <>
            <FormFilters />
            <OffersList
              offers={data}
              offerType={OfferClassesTypes[offersListType]}
            />
          </>
        ) : (
          null
        )}
      </section>
      <section className="col-6 bg-light text-center places-map-container">

      </section>
    </div>
  );
};

PlacesWrapper.propTypes = {
  offersReducer: offersReducerPropTypes,
};

export default PlacesWrapper;
