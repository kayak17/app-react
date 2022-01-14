import PropTypes from 'prop-types';
import useGetData from '../use-get-data/use-get-data';
import CitiesList from '~/components/cities/list/list';
import CitiesListEmpty from '~/components/cities/list-empty/list-empty';
import PlacesWrapper from '~/components/places/wrapper/wrapper';
import {
  AppSRTitles,
  FetchingStatuses,
} from '~/constants';

const PageMainContent = ({ setIsLoading }) => {
  const {
    offers,
    stateCities,
    stateOffers,
    handleSetActiveCity,
  } = useGetData();

  const isCitiesError = (
    stateCities.status === FetchingStatuses.ERROR
  );
  const isCitiesLoaded = (
    stateCities.status === FetchingStatuses.LOADED
  );

  const isOffersLoading = (
    stateOffers.status !== FetchingStatuses.ERROR &&
    stateOffers.status !== FetchingStatuses.LOADED
  );
  const isOffersError = (
    stateOffers.status === FetchingStatuses.ERROR
  );

  return (
    <>
      {isCitiesLoaded ? (
        <CitiesList
          cities={stateCities.data}
          onSetActiveCity={handleSetActiveCity}
        />
      ) : (
        <CitiesListEmpty />
      )}

      {!isCitiesError && isOffersLoading ? (
        null
      ) :
        isCitiesError || isOffersError ? (
          null
        ) : (
          <div className="row mx-0">
            <h1 className="visually-hidden">
              {AppSRTitles.MAIN_PAGE_PLACES}
            </h1>
            <section className="col-6 text-center">
              <PlacesWrapper
                offers={offers}
              />
            </section>
            <section className="col-6 text-center bg-light">

            </section>
          </div>
        )
      }
    </>
  );
};

PageMainContent.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageMainContent;
