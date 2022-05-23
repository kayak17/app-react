import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OffersMap from '../map/map';
import usePrevious from '~/hooks/use-previous/use-previous';
import { getActiveCityId } from '~/modules/main';
import { getOffersMapURL } from '~/utils';
import useFetchOffersMap from './use-fetch-offers-map';

const OffersMapContainer = () => {
  const activeCityId = useSelector(getActiveCityId);
  const [offersMap, setOffersMap] = useState([]);
  const offersMapURL = getOffersMapURL(activeCityId);
  const prevOffersMapURL = usePrevious(offersMapURL);

  const {
    cacheoffersMap,
    isOffersMapLoaded,
    fetchMapOffers,
  } = useFetchOffersMap({
    offersMapURL,
    setOffersMap,
  });

  useEffect(() => {
    if (
      isOffersMapLoaded &&
      prevOffersMapURL !== offersMapURL
    ) {
      const payload = cacheoffersMap.current[offersMapURL];

      if (isEmpty(payload)) {
        fetchMapOffers(offersMapURL);
      } else {
        setOffersMap(payload.data);
      }
    }
  }, [
    cacheoffersMap,
    fetchMapOffers,
    isOffersMapLoaded,
    offersMapURL,
    prevOffersMapURL,
  ]);

  return (
    <OffersMap offers={offersMap} />
  );
};

export default OffersMapContainer;
