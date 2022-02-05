import PropTypes from 'prop-types';
import OffersList from '~/components/offer/list/list';
import OffersListScroll from '~/components/offer/list-scroll/list-scroll';
import FormFilters from '../form-filters/form-filters';
import { OfferClassesTypes, OfferTitles } from '~/constants';
import { offersReducerPropTypes, refPropTypes } from '~/prop-types';
import { getHeaderLinkNext } from '~/utils';

const PlacesContent = ({
  offersReducer,
  offersListType,
  scrollContainer,
  setScrolledOffers,
}) => {
  const headerLinkNext = getHeaderLinkNext(offersReducer.headerLink);
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
    <>
      <h2 className="px-5 my-3 app-subtitle">
        {getTitle()}
      </h2>
      {offers.length ? (
        <>
          <div className="px-3">
            <FormFilters />
          </div>
          <OffersListScroll
            render={() => (
              <OffersList
                offers={offers}
                offerType={OfferClassesTypes[offersListType]}
              />
            )}
            containerClass={'pt-2 ps-2'}
            headerLinkNext={headerLinkNext}
            scrollContainer={scrollContainer}
            setScrolledOffers={setScrolledOffers}
          />
        </>
      ) : (
        null
      )}
    </>
  );
};

PlacesContent.propTypes = {
  offersReducer: offersReducerPropTypes,
  offersListType: PropTypes.string.isRequired,
  scrollContainer: refPropTypes,
  setScrolledOffers: PropTypes.func.isRequired,
};

export default PlacesContent;
