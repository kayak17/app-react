import PropTypes from 'prop-types';
import CitiesList from '~/components/cities/list/list';
import CitiesListEmpty from '~/components/cities/list-empty/list-empty';
import PlacesWrapper from '~/components/places/wrapper/wrapper';
import { AppSRTitles } from '~/constants';


const PageMainContent = ({
  cities,
  offers,
  isCitiesError,
  isCitiesLoaded,
  isOffersLoading,
  isOffersError,
  activeCityName,
  offersTotalCount,
}) => {

  return (
    <>
      {isCitiesLoaded ? (
        <CitiesList cities={cities} />
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
                activeCityName={activeCityName}
                offersTotalCount={offersTotalCount}
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
  cities: PropTypes.array.isRequired,
  offers: PropTypes.array.isRequired,
  isCitiesError: PropTypes.bool.isRequired,
  isCitiesLoaded: PropTypes.bool.isRequired,
  isOffersLoading: PropTypes.bool.isRequired,
  isOffersError: PropTypes.bool.isRequired,
  activeCityName: PropTypes.string.isRequired,
  offersTotalCount: PropTypes.string.isRequired,
};

export default PageMainContent;
