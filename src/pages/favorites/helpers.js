import uniqBy from 'lodash/uniqBy';

export const getCitiesFromOffers = (offers) => (
  uniqBy(offers, 'city.id').map((offer) => offer.city).sort()
);

export const getOffersMapByCity = (offers) => {
  const offersMap = new Map();
  const citiesList = getCitiesFromOffers(offers);

  citiesList.forEach((city) => {
    offersMap.set(city.id, []);
  });

  offers.forEach((offer) => {
    offersMap.get(offer.city.id).push(offer);
  });

  offersMap.forEach((value, key, map) => {
    if (!value.length) {
      map.delete(key);
    }
  });

  return offersMap;
};
