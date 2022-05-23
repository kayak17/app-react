import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOffersListType,
  setOffersListType,
} from '~/modules/main';
import {
  OfferStyleTypes,
  OFFERS_LIST_TYPE_ARIA_LABEL,
} from '~/constants';
import { refPropTypes } from '~/prop-types';
import { appScrollTo } from '~/utils';
import './list-style.less';

const PlacesFiltersListStyle = ({ scrollContainer }) => {
  const offersListType = useSelector(getOffersListType);
  const dispatch = useDispatch();

  const onOffersTypeItemClick = (listType) => {
    if (offersListType !== listType) {
      appScrollTo(scrollContainer);
      dispatch(setOffersListType(listType));
    }
  };

  return (
    <div
      className="ms-auto btn-group"
      aria-label={OFFERS_LIST_TYPE_ARIA_LABEL}
      role="group"
    >
      {
        Object.values(OfferStyleTypes).map((item) => (
          <button
            key={item}
            className={
              clsx(`btn btn-light places-list-btn places-list-btn-${item}`,
                { 'active': offersListType === item }
              )
            }
            type="button"
            title={item}
            onClick={() => onOffersTypeItemClick(item)}
          />
        ))
      }
    </div>
  );
};

PlacesFiltersListStyle.propTypes = {
  scrollContainer: refPropTypes,
};

export default PlacesFiltersListStyle;
