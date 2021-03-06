import PropTypes from 'prop-types';
import OffersListPlaceholder from '~/components/offer/list-placeholder/list-placeholder';
import { getArrayOfUndefineds } from '~/utils';
import '../favorites.less';

const FavoritesContentPlaceholder = ({ offerType }) => {
  const dataArray = getArrayOfUndefineds(3);

  return (
    <ul
      className="d-flex flex-column align-items-center
        list-unstyled placeholder-glow"
      aria-hidden="true"
    >
      <li className="d-flex">
        <div className="favorites-link-container">
          <div>
            <a
              className="col-6 btn btn-primary app-skewed-neg-15 fs-5-3
                disabled placeholder favorites-link"
              tabIndex="-1"
            >
            </a>
          </div>
        </div>
        <div className="favorites-offers-container">
          <OffersListPlaceholder
            offers={dataArray}
            offerType={offerType}
          />
        </div>
      </li>
    </ul>
  );
};

FavoritesContentPlaceholder.propTypes = {
  offerType: PropTypes.string.isRequired,
};

export default FavoritesContentPlaceholder;
