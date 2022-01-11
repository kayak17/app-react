import clsx from 'clsx';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

const ButtonCommon = ({
  additionalClass,
  isLoading,
  title,
}) => {
  return (
    <button
      className={
        clsx('btn btn-primary', additionalClass)
      }
      disabled={isLoading}
      type="submit"
    >
      {isLoading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          &nbsp;
        </>
      )}
      {title}
    </button>
  );
};

ButtonCommon.propTypes = {
  additionalClass: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default ButtonCommon;
