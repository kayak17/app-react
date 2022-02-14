import PropTypes from 'prop-types';
import { ErrorMessage, Field } from 'formik';
import CustomError from '../error/error';

const CustomField = ({
  autoComplete = '',
  children = null,
  component = '',
  containerClass = '',
  fieldClass = '',
  fieldId,
  fieldName,
  fieldType,
  labelTitle,
  onFocus = () => false,
  placeholder = '',
}) => (
  <div className={`app-form-group form-group ${containerClass}`}>
    <label
      className="visually-hidden"
      htmlFor={fieldName}
    >
      {labelTitle}
    </label>
    <Field
      className={`app-form-control form-control ${fieldClass}`}
      autoComplete={autoComplete}
      component={component}
      id={fieldId}
      name={fieldName}
      placeholder={placeholder}
      type={fieldType}
      onFocus={onFocus}
    >
      {children}
    </Field>
    <ErrorMessage
      name={fieldName}
      component={CustomError}
    />
  </div>
);

CustomField.propTypes = {
  autoComplete: PropTypes.string,
  children: PropTypes.element,
  component: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
  ]),
  containerClass: PropTypes.string,
  fieldClass: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
};

export default CustomField;
