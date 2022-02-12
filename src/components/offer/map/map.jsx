import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import leaflet from 'leaflet';
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
  MAP_TOOLTIP_SETTING,
  MAP_ZOOM_DEFAULT,
  MAP_DEFAULT_ICON_DATA,
  MAP_ACTIVE_ICON_DATA,
  MAP_CURRENT_ICON_DATA,
  AppRoutes,
  InitialModulesValues,
} from '~/constants';
import {
  cityPropTypes,
  offerPropTypes,
  offersMapPropTypes,
  mapPinIdPropTypes,
  getItemOrNullPropTypes,
} from '~/prop-types';
import {
  getMapCenterAndZoom,
  getMapTooltipMarkup,
} from '~/utils';
import 'leaflet/dist/leaflet.css';

class OffersMap extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.markers = [];
    this.zoom = MAP_ZOOM_DEFAULT;
    this.center = MAP_CENTER_DEFAULT;
    this.tooltipSettings = MAP_TOOLTIP_SETTING;
    this.icon = leaflet.icon(MAP_DEFAULT_ICON_DATA);
    this.activeIcon = leaflet.icon(MAP_ACTIVE_ICON_DATA);
    this.currentIcon = leaflet.icon(MAP_CURRENT_ICON_DATA);
  }

  componentDidMount() {
    const {
      offers,
      activeCity,
      currentOffer,
    } = this.props;

    const { center, zoom } = getMapCenterAndZoom(activeCity);

    this.map = leaflet.map(MAP_ID, {
      center,
      zoom,
      marker: true,
    });

    leaflet
      .tileLayer(MAP_TILE_LAYER, {
        attribution: MAP_TILE_LAYER_ATTRIBUTION,
      })
      .addTo(this.map);

    if (offers.length) {
      this._addMarkers(offers);
    }

    if (!isEmpty(currentOffer)) {
      this._addMarkerCurrentOffer(currentOffer);
    }

    if (!isEmpty(activeCity)) {
      this.center = activeCity.coordinates;
      this.zoom = activeCity.zoom;
      this.map.flyTo(this.center, this.zoom);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      activeCity,
      activeOffer,
      currentOffer,
      offers,
    } = this.props;

    if (
      !isEqual(prevProps.offers, offers) ||
      !isEqual(prevProps.currentOffer, currentOffer)
    ) {
      this._removeMarkers();

      if (offers.length) {
        this._addMarkers(offers);
      }

      if (!isEmpty(currentOffer)) {
        this._addMarkerCurrentOffer(currentOffer);
      }
    }

    if (!isEqual(prevProps.activeOffer, activeOffer)) {
      if (!isEmpty(prevProps.activeOffer)) {
        for (const marker of this.markers) {
          if (marker._offerId === prevProps.activeOffer.id) {
            marker.setIcon(this.icon);
            marker._isActive = false;
            break;
          }
        }
      }

      if (!isEmpty(activeOffer)) {
        for (const marker of this.markers) {
          if (marker._offerId === activeOffer.id) {
            marker.setIcon(this.activeIcon);
            marker._isActive = true;
            break;
          }
        }
      } else {
        for (const marker of this.markers) {
          if (marker._isActive === true) {
            marker.setIcon(this.icon);
            marker._isActive = false;
            break;
          }
        }

        this.map.flyTo(this.center, this.zoom);
      }
    }

    if (
      !isEqual(prevProps.activeCity, activeCity) &&
      !isEmpty(activeCity)
    ) {
      this.center = activeCity.coordinates;
      this.zoom = activeCity.zoom;
      this.map.flyTo(this.center, this.zoom);
    }
  }

  componentWillUnmount() {
    this._removeMarkers();
  }

  _getOfferIcon(activeOfferId, activePinId, offerId) {
    return (
      activeOfferId && activeOfferId === offerId ||
      activePinId === offerId
    ) ? this.activeIcon : this.icon;
  }

  _addMarkers(offers) {
    const {
      activeOffer,
      activePinId,
      setActivePinIdAction,
      redirectToRoute,
    } = this.props;

    const activeOfferId = !isEmpty(activeOffer) && activeOffer.id;

    offers.forEach((offer) => {
      const { coordinates, id: offerId } = offer;

      const marker = leaflet
        .marker(coordinates, {
          icon: this._getOfferIcon(activeOfferId, activePinId, offerId)
        })
        .addTo(this.map)
        .bindTooltip(
          getMapTooltipMarkup(offer),
          this.tooltipSettings
        );

      marker._offerId = offerId;

      marker.on('click', () => {
        redirectToRoute(`${AppRoutes.OFFER}?id=${offerId}`);
      });

      marker.on('mouseover', () => {
        marker.setIcon(this.activeIcon).openTooltip();
        setActivePinIdAction(offerId);
      });

      marker.on('mouseout', () => {
        marker.setIcon(this.icon);
        setActivePinIdAction(InitialModulesValues.PIN_ID);
      });

      this.markers.push(marker);
    });
  }

  _addMarkerCurrentOffer(currentOffer) {
    const marker = leaflet.marker(
      currentOffer.coordinates,
      { icon: this.currentIcon }
    ).addTo(this.map);

    this.markers.push(marker);
  }

  _removeMarkers() {
    this.markers.forEach((item) => {
      item.off('click');
      item.off('mouseover');
      item.off('mouseout');
      item.removeFrom(this.map);
    });

    this.markers = [];
  }

  render() {
    return (
      <div id={MAP_ID} className="d-flex bg-light text-center w-100 h-100"></div>
    );
  }
}

OffersMap.propTypes = {
  offers: offersMapPropTypes,
  redirectToRoute: PropTypes.func.isRequired,
  activeCity: cityPropTypes,
  activeOffer: getItemOrNullPropTypes(offerPropTypes),
  currentOffer: getItemOrNullPropTypes(offerPropTypes),
  activePinId: mapPinIdPropTypes,
  setActivePinIdAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  activeOffer: getActiveOffer(state),
  activePinId: getActivePinId(state),
});

const mapDispatchToProps = ((dispatch) => ({
  setActivePinIdAction(pinId) {
    dispatch(setActivePinId(pinId));
  },
}));

export default connect(mapStateToProps, mapDispatchToProps)(OffersMap);
