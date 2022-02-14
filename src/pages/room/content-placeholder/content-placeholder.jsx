import PropTypes from 'prop-types';
import PropertyContentPlaceholder from '~/components/property/content-placeholder/content-placeholder';
import '../content/content.less';

const PageRoomContentPlaceholder = ({ offerType }) => {
  return (
    <section className="mt-4 ms-auto me-auto mb-3 text-center
      property-container placeholder-glow"
    >
      <PropertyContentPlaceholder offerType={offerType} />
    </section>
  );
};

PageRoomContentPlaceholder.propTypes = {
  offerType: PropTypes.string.isRequired,
};

export default PageRoomContentPlaceholder;
