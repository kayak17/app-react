import PlacesFiltersSorting from '../filters/sorting/sorting';
import PlacesFiltersListStyle from '../filters/list-style/list-style';
import { refPropTypes } from '~/prop-types';

const FormFilters = ({ scrollContainer }) => {
  return (
    <form className="d-flex pb-1 fs-6-3">
      <PlacesFiltersSorting></PlacesFiltersSorting>
      <PlacesFiltersListStyle
        scrollContainer={scrollContainer}
      >
      </PlacesFiltersListStyle>
    </form>
  );
};

FormFilters.propTypes = {
  scrollContainer: refPropTypes,
};

export default FormFilters;
