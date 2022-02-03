import isEmpty from 'lodash/isEmpty';

export const getUpdatedOffersIdsMap = (
  data, activeCityId, activeCityName, offerId, userId
) => {
  const offersIdsMap = Object.assign({}, data);

  if (!isEmpty(offersIdsMap) && userId &&
    Object.keys(offersIdsMap).includes(userId.toString(10))
  ) {
    const dataByUser = offersIdsMap[userId];
    let dataByCity = undefined;
    for (const item of dataByUser) {
      if (item.id === activeCityId) {
        dataByCity = item;
        break;
      }
    }

    if (dataByCity) {
      const offerIdsByCity = dataByCity.offersIds ? dataByCity.offersIds : [];

      if (offerIdsByCity.includes(offerId)) {
        const idx = offerIdsByCity.findIndex((item) => item === offerId);
        offerIdsByCity.splice(idx, 1);
      } else {
        offerIdsByCity.push(offerId);
      }

      if (!offerIdsByCity.length) {
        const idx = dataByUser.findIndex((item) => item.id === activeCityId);
        dataByUser.splice(idx, 1);
      }

      if (!dataByUser.length) {
        delete offersIdsMap[userId];
      }
    } else {
      dataByUser.push({
        id: activeCityId,
        name: activeCityName,
        offersIds: [offerId],
      });
    }
  } else {
    offersIdsMap[userId] = [{
      id: activeCityId,
      name: activeCityName,
      offersIds: [offerId],
    }];
  }

  return offersIdsMap;
};

export const getOffersIdsByUserData = (data, userId) => {
  const offersIdsMap = Object.assign({}, data);

  if (!isEmpty(offersIdsMap) && userId &&
    Object.keys(offersIdsMap).includes(userId.toString(10))
  ) {
    const dataByUser = offersIdsMap[userId];
    return dataByUser.reduce((arr, item) => arr.concat(item.offersIds), []);
  }

  return [];
};
