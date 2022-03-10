import leaflet from 'leaflet';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '~/hooks/use-previous/use-previous';
import useRouterNavigate from '~/hooks/use-router-navigate/use-router-navigate';
import {
  getActiveCity,
} from '~/modules/main';
import {
  getActiveOffer,
  getActivePinId,
  setActivePinId,
} from '~/modules/offers-map';
import {
  MAP_CENTER_DEFAULT,
  MAP_ID,
  MAP_TILE_LAYER,
  MAP_TILE_LAYER_ATTRIBUTION,
  MAP_ZOOM_DEFAULT,
  MAP_DEFAULT_ICON_DATA,
  MAP_ACTIVE_ICON_DATA,
  MAP_CURRENT_ICON_DATA,
} from '~/constants';
import {
  offerPropTypes,
  offersMapPropTypes,
  getItemOrNullPropTypes,
} from '~/prop-types';
import {
  addMarkers,
  proceedMarkers,
  getMapCenterAndZoom,
} from './helpers';
import 'leaflet/dist/leaflet.css';

const icon = leaflet.icon(MAP_DEFAULT_ICON_DATA);
const activeIcon = leaflet.icon(MAP_ACTIVE_ICON_DATA);
const currentIcon = leaflet.icon(MAP_CURRENT_ICON_DATA);

const OffersMap = ({ offers, currentOffer }) => {
  const redirectToRoute = useRouterNavigate();
  const prevOffers = usePrevious(offers);
  const prevCurrentOffer = usePrevious(currentOffer);
  const activeCity = useSelector(getActiveCity, isEqual);
  const prevActiveCity = usePrevious(activeCity);
  const activeOffer = useSelector(getActiveOffer, isEqual);
  const prevActiveOffer = usePrevious(activeOffer);
  const activePinId = useSelector(getActivePinId);
  const dispatch = useDispatch();

  const {
    center: centerInitial,
    zoom: zoomInitial,
  } = getMapCenterAndZoom(activeCity);

  const map = useRef(null);
  const markers = useRef([]);
  const [center, setCenter] = useState(centerInitial);
  const [zoom, setZoom] = useState(zoomInitial);

  useEffect(() => {
    map.current = leaflet.map(MAP_ID, {
      center: MAP_CENTER_DEFAULT,
      zoom: MAP_ZOOM_DEFAULT,
      marker: true,
    });

    leaflet
      .tileLayer(MAP_TILE_LAYER, {
        attribution: MAP_TILE_LAYER_ATTRIBUTION,
      })
      .addTo(map.current);

    return () => {
      if (markers.current.length) {
        markers.current.forEach((item) => {
          item.off('click');
          item.off('mouseover');
          item.off('mouseout');
          item.removeFrom(map.current);
        });

        markers.current = [];
      }
    };
  }, []);

  useEffect(() => {
    map.current.flyTo(center, zoom);
  }, [center, zoom]);

  useEffect(() => {
    if (
      !isEmpty(activeCity) &&
      !isEqual(prevActiveCity, activeCity)
    ) {
      setCenter(activeCity.coordinates);
      setZoom(activeCity.zoom);
    }
  }, [activeCity, prevActiveCity]);

  useEffect(() => {
    if (
      !isEqual(prevOffers, offers) ||
      !isEqual(prevCurrentOffer, currentOffer)
    ) {
      addMarkers({
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
      });
    }
  }, [
    markers,
    offers,
    prevOffers,
    currentOffer,
    prevCurrentOffer,
    activeOffer,
    activePinId,
    dispatch,
    redirectToRoute,
  ]);

  useEffect(() => {
    if (
      !isEqual(prevActiveOffer, activeOffer) &&
      markers.current.length
    ) {
      proceedMarkers({
        icon,
        activeIcon,
        markers,
        activeOffer,
        prevActiveOffer,
      });
    }
  }, [
    markers,
    activeOffer,
    prevActiveOffer,
  ]);

  return (
    <div id={MAP_ID} className="d-flex bg-light text-center w-100 h-100"></div>
  );
};

OffersMap.propTypes = {
  offers: offersMapPropTypes,
  currentOffer: getItemOrNullPropTypes(offerPropTypes),
};

export default OffersMap;
