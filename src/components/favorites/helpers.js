export const getCitiesFromOffersMapByCity = (offersMapByCity) => (
  Array.from(offersMapByCity.keys())
);

export const getCityNameByCityId = (offersMapByCity, cityId) => (
  offersMapByCity.get(cityId)[0].city.name
);

export const getOffersByCityId = (offersMapByCity, cityId) => (
  offersMapByCity.get(cityId)
);
