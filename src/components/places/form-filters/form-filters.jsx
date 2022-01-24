import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CustomNavItem from '~/components/custom-react-bootstrap/nav-item/nav-item';
import {
  getOffersListType,
  setOffersListType,
  getSortingType,
  setSortingType,
} from '~/modules/main';
import {
  OfferStyleTypes,
  OFFERS_LIST_TYPE_ARIA_LABEL,
  SortingTypes,
  SORTING_TITLE,
} from '~/constants';
import './form-filters.less';

const FormFilters = () => {
  const offersListType = useSelector(getOffersListType);
  const sortingType = useSelector(getSortingType);
  const [sorting, setSorting] = useState(SortingTypes[sortingType]);
  const dispatch = useDispatch();

  const onSortingItemClick = (sortingItem) => {
    if (sortingType !== sortingItem) {
      dispatch(setSortingType(sortingItem));
      setSorting(SortingTypes[sortingItem]);
    }
  };

  const onOffersTypeItemClick = (listType) => {
    if (offersListType !== listType) {
      dispatch(setOffersListType(listType));
    }
  };

  return (
    <form className="d-flex mb-3 fs-6-3">
      <div className="d-flex">
        <b>{SORTING_TITLE}</b>
        <NavDropdown
          bsPrefix="mx-2 px-0 py-0 nav-link link-dark app-dropdown-toggle-sm app-hover-opacity app-trasition"
          id="sorting-options-dropdown"
          title={<>{sorting}</>}
        >
          {Object.keys(SortingTypes).map((item) => (
            <NavDropdown.Item
              as={CustomNavItem}
              key={item}
              active={sortingType === item}
              onClick={() => onSortingItemClick(item)}
            >
              <>{SortingTypes[item]}</>
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </div>
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
    </form>
  );
};

export default FormFilters;
