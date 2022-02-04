import union from 'lodash/union';
import unionBy from 'lodash/unionBy';

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
