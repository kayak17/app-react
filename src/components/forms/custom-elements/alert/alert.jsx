import PropTypes from 'prop-types';
import { BsStyleTypes } from '~/constants';

const CustomAlert = ({
  alertClass = '',
  alertType = BsStyleTypes.INFO,
  children = null,
  containerClass = '',
}) => (
  <div className={`app-form-group form-group ${containerClass}`}>
    <div
      className={`alert alert-${alertType} text-center ${alertClass}`}
      role="alert"
    >
      {children}
    </div>
  </div>
);

CustomAlert.propTypes = {
  alertClass: PropTypes.string,
  alertType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  containerClass: PropTypes.string,
};

export default CustomAlert;
