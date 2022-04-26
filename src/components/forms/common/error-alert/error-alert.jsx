import clsx from 'clsx';
import PropTypes from 'prop-types';
import CustomAlert from '../../custom-elements/alert/alert';
import { BsStyleTypes } from '~/constants';

const ErrorAlert = ({ alertClass, errorMsg }) => {
  return (
    <CustomAlert
      alertClass={clsx(alertClass)}
      alertType={BsStyleTypes.DANGER}
    >
      {errorMsg}
    </CustomAlert>
  );
};

ErrorAlert.propTypes = {
  alertClass: PropTypes.string.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

export default ErrorAlert;

