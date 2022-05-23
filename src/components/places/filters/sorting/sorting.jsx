import { useDispatch, useSelector } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CustomNavItem from '~/components/custom-react-bootstrap/nav-item/nav-item';
import { getSortingType, setSortingType } from '~/modules/main';
import { SortingTypes, SORTING_TITLE } from '~/constants';

const PlacesFiltersSorting = () => {
  const sortingType = useSelector(getSortingType);
  const sorting = SortingTypes[sortingType];
  const dispatch = useDispatch();

  const onSortingItemClick = (sortingItem) => {
    if (sortingType !== sortingItem) {
      dispatch(setSortingType(sortingItem));
    }
  };

  return (
    <div className="d-flex">
      <b>{SORTING_TITLE}</b>
      <NavDropdown
        bsPrefix="d-flex align-items-center mx-2 px-0 py-0 nav-link link-dark
            app-dropdown-toggle-sm app-hover-opacity app-trasition"
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
  );
};

export default PlacesFiltersSorting;
