import remove from 'lodash/remove';
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

export const getUpdatedOffersMap = (offersMap, offersIds) => {
  offersMap.forEach((value, key, map) => {
    value.forEach((offer) => {
      if (!offersIds.find((itm) => itm === offer.id)) {
        remove(value, (item) => item.id === offer.id);
      }
    });

    if (!value.length) {
      map.delete(key);
    }
  });

  return offersMap;
};

export const getCitiesFromOffersMapByCity = (offersMapByCity) => (
  Array.from(offersMapByCity.keys())
);

export const getCityNameByCityId = (offersMapByCity, cityId) => (
  offersMapByCity.get(cityId)[0].city.name
);

export const getOffersByCityId = (offersMapByCity, cityId) => (
  offersMapByCity.get(cityId)
);
