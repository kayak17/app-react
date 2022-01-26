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
  MAP_PIN_SIZE,
  MAP_PIN_URL,
  MAP_PIN_ACTIVE_URL,
  MAP_TILE_LAYER,
  MAP_TILE_LAYER_ATTRIBUTION,
  MAP_TOOLTIP_SETTING,
  MAP_ZOOM_DEFAULT,
  InitialModulesValues,
} from '~/constants';
import {
  cityPropTypes,
  offerPropTypes,
  offersPropTypes,
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
    this.center = MAP_CENTER_DEFAULT;
    this.zoom = MAP_ZOOM_DEFAULT;
    this.tooltipSettings = MAP_TOOLTIP_SETTING;

    this.icon = leaflet.icon({
      iconUrl: MAP_PIN_URL,
      iconSize: MAP_PIN_SIZE,
    });
    this.activeIcon = leaflet.icon({
      iconUrl: MAP_PIN_ACTIVE_URL,
      iconSize: MAP_PIN_SIZE,
    });
  }

  componentDidMount() {
    const {
      offers,
      activeCity,
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
      offers,
    } = this.props;

    if (!isEqual(prevProps.offers, offers)) {
      this._removeMarkers();

      if (offers.length) {
        this._addMarkers(offers);
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
    const { activeOffer, activePinId, setActivePinIdAction } = this.props;
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
  offers: offersPropTypes,
  activeCity: cityPropTypes,
  activeOffer: getItemOrNullPropTypes(offerPropTypes),
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
