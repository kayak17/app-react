import PropTypes from 'prop-types';

const IconBookmark = ({ className, width, height }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <symbol id="icon-bookmark" viewBox="0 0 17 18">
        <path
          d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z">
        </path>
      </symbol>
      <use href="#icon-bookmark" />
    </svg>
  );
};

IconBookmark.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default IconBookmark;
