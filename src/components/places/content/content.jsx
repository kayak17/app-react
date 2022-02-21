import PropTypes from 'prop-types';
import { useCallback, useContext } from 'react';
import OffersList from '~/components/offer/list/list';
import BottomScrollList from '~/components/bottom-scroll-list/bottom-scroll-list';
import useOffersListHover from '~/hooks/use-offers-list-hover/use-offers-list-hover';
import FormFilters from '../form-filters/form-filters';
import {
  ScrolledOffersContext,
  ScrollContainerContext,
  ScrolledOffersDispatchContext,
} from '~/pages/main/wrapper/wrapper';
import {
  AppActionTypes,
  OfferClassesTypes,
  OfferTitles,
} from '~/constants';
import { getHeaderLinkNext } from '~/utils';

const PlacesContent = ({ offersListType }) => {
  const offersReducer = useContext(ScrolledOffersContext);
  const scrollContainer = useContext(ScrollContainerContext);
  const dispatchData = useContext(ScrolledOffersDispatchContext);
  const {
    handleOfferCardMouseEnter,
    handleOfferCardMouseLeave,
  } = useOffersListHover();

  const headerLinkNext = getHeaderLinkNext(offersReducer.headerLink);
  const activeCityName = offersReducer.activeCityName;
  const totalCount = offersReducer.totalCount;
  const offers = offersReducer.data;

  const handleSetScrolledOffers = useCallback((payload) => {
    dispatchData({
      type: AppActionTypes.SET_SCROLLED_DATA,
      payload: {
        data: offersReducer.data.concat(payload.data),
        headerLink: payload.headerLink,
      },
    });
  }, [offersReducer.data, dispatchData]);

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
          <div className="mb-2 px-3">
            <FormFilters scrollContainer={scrollContainer} />
          </div>
          <BottomScrollList
            render={() => (
              <OffersList
                offers={offers}
                offerType={OfferClassesTypes[offersListType]}
                handleOfferCardMouseEnter={handleOfferCardMouseEnter}
                handleOfferCardMouseLeave={handleOfferCardMouseLeave}
              />
            )}
            containerClass={'pt-2 ps-2'}
            headerLinkNext={headerLinkNext}
            scrollContainer={scrollContainer}
            setScrolledItems={handleSetScrolledOffers}
          />
        </>
      ) : (
        null
      )}
    </>
  );
};

PlacesContent.propTypes = {
  offersListType: PropTypes.string.isRequired,
};

export default PlacesContent;
