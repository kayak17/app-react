import remove from 'lodash/remove';
import union from 'lodash/union';
import unionBy from 'lodash/unionBy';
import uniqBy from 'lodash/uniqBy';
import { APIRoutes } from '~/constants';

const addOfferToFavorites = ({
  favoriteOffersIds, favoriteOffersIdsByUser, offerId, userId
}) => {
  const offers = favoriteOffersIdsByUser ?
    union(favoriteOffersIdsByUser, [offerId]) : [offerId];

  return unionBy([{ userId, offers }], favoriteOffersIds, 'userId');
};

const removeOfferFromFavorites = ({
  favoriteOffersIds, favoriteOffersIdsByUser, offerId, userId
}) => {
  const offers = favoriteOffersIdsByUser ?
    favoriteOffersIdsByUser.filter((item) => item !== offerId) : [];

  return unionBy([{ userId, offers }], favoriteOffersIds, 'userId');
};

export const getUpdatedFavoriteOffers = ({
  isInFavorites,
  favoriteOffersIds,
  favoriteOffersIdsByUser,
  offerId,
  userId,
}) => (
  isInFavorites ?
    removeOfferFromFavorites({
      favoriteOffersIds,
      favoriteOffersIdsByUser,
      offerId,
      userId,
    }) : (
      addOfferToFavorites({
        favoriteOffersIds,
        favoriteOffersIdsByUser,
        offerId,
        userId,
      })
    )
);

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

export const getCityNameByCityId = (offersMapByCity, cityId) => (
  offersMapByCity.get(cityId)[0].city.name
);

export const getCitiesFromOffersMapByCity = (offersMapByCity) => (
  Array.from(offersMapByCity.keys())
);

export const getOffersByCityId = (offersMapByCity, cityId) => (
  offersMapByCity.get(cityId)
);

export const getFavoriteOffersURL = (offersByUser) => (
  `${APIRoutes.OFFERS}?id=${offersByUser.join('&id=')}`
);
