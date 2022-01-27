import PropTypes from 'prop-types';
import PageFavoritesContent from '../content/content';

const PageFavoritesWrapper = ({ setIsLoading }) => {
  return (
    <PageFavoritesContent
      setIsLoading={setIsLoading}
    />
  );
};

PageFavoritesWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageFavoritesWrapper;
