import PropTypes from 'prop-types';
import PageRoomContent from '../content/content';

const PageRoomWrapper = ({ setIsLoading }) => {
  return (
    <PageRoomContent
      setIsLoading={setIsLoading}
    />
  );
};

PageRoomWrapper.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};

export default PageRoomWrapper;
