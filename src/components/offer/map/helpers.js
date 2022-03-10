import leaflet from 'leaflet';
import isEmpty from 'lodash/isEmpty';
import {
  AppRoutes,
  InitialModulesValues,
  OfferSrTitles,
  MAP_CENTER_DEFAULT,
  MAP_ZOOM_DEFAULT,
  MAP_TOOLTIP_SETTING,
  OFFER_CURRENCY,
  OFFER_PRICE_PERIOD,
} from '~/constants';
import {
  getRatingStarsWidth,
} from '~/utils';
import '~/components/rating/stars/stars.less';

const DELTA = 0.2;

export const getMapCenterAndZoom = (activeCity) => {
  let center = MAP_CENTER_DEFAULT;
  let zoom = MAP_ZOOM_DEFAULT;

  if (!isEmpty(activeCity)) {
    center = [
      activeCity.coordinates[0] - DELTA,
      activeCity.coordinates[1] - DELTA
    ];
    zoom = activeCity.zoom;
  }

  return { center, zoom };
};

const getMapTooltipMarkup = ({
  price,
  rating,
  title,
  type: flatType,
}) => {
  return `
    <b>${title}</b><br />
    <span>
      ${OFFER_CURRENCY} ${price} ${OFFER_PRICE_PERIOD}
    </span>,
    <span>${flatType}</span><br />
    <span class="offer-card-rating rating justify-content-center">
      <span class="offer-card-stars rating-stars">
        <span style="width: ${getRatingStarsWidth(rating)}%;" />
        <span className="visually-hidden">
          ${OfferSrTitles.RATING}
        </span>
      </span>
    </span>
  `;
};

export const addMarkers = ({
  map,
  markers,
  offers,
  currentOffer,
  activeOffer,
  icon,
  activeIcon,
  currentIcon,
  activePinId,
  setActivePinId,
  redirectToRoute,
  dispatch,
}) => {
  const getOfferIcon = (activeOfferId, offerId) => {
    return (
      activeOfferId && activeOfferId === offerId ||
      activePinId === offerId
    ) ? activeIcon : icon;
  };

  const addNewMarkers = () => {
    const activeOfferId = !isEmpty(activeOffer) && activeOffer.id;

    offers.forEach((offer) => {
      const { coordinates, id: offerId } = offer;

      const marker = leaflet
        .marker(coordinates, {
          icon: getOfferIcon(activeOfferId, offerId)
        })
        .addTo(map.current)
        .bindTooltip(
          getMapTooltipMarkup(offer),
          MAP_TOOLTIP_SETTING
        );

      marker._offerId = offerId;

      marker.on('click', () => {
        redirectToRoute(`${AppRoutes.OFFER}?id=${offerId}`);
      });

      marker.on('mouseover', () => {
        marker.setIcon(activeIcon).openTooltip();
        dispatch(setActivePinId(offerId));
      });

      marker.on('mouseout', () => {
        marker.setIcon(icon);
        dispatch(setActivePinId(InitialModulesValues.PIN_ID));
      });

      markers.current.push(marker);
    });
  };

  const addMarkerCurrentOffer = () => {
    const marker = leaflet.marker(
      currentOffer.coordinates,
      { icon: currentIcon }
    ).addTo(map.current);

    markers.current.push(marker);
  };

  const removeMarkers = () => {
    markers.current.forEach((item) => {
      item.off('click');
      item.off('mouseover');
      item.off('mouseout');
      item.removeFrom(map.current);
    });

    markers.current = [];
  };

  if (markers.current.length) {
    removeMarkers();
  }

  if (offers.length) {
    addNewMarkers();
  }

  if (!isEmpty(currentOffer)) {
    addMarkerCurrentOffer();
  }
};

export const proceedMarkers = ({
  icon,
  activeIcon,
  markers,
  activeOffer,
  prevActiveOffer,
}) => {
  if (!isEmpty(prevActiveOffer)) {
    for (const marker of markers.current) {
      if (marker._offerId === prevActiveOffer.id) {
        marker.setIcon(icon);
        marker._isActive = false;
        break;
      }
    }
  }

  if (!isEmpty(activeOffer)) {
    for (const marker of markers.current) {
      if (marker._offerId === activeOffer.id) {
        marker.setIcon(activeIcon);
        marker._isActive = true;
        break;
      }
    }
  } else {
    for (const marker of markers.current) {
      if (marker._isActive === true) {
        marker.setIcon(icon);
        marker._isActive = false;
        break;
      }
    }
  }
};
