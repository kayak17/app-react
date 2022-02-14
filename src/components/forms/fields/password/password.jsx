import PropTypes from 'prop-types';
import CustomField from '~/components/forms/custom-elements/field/field';
import { FormInputPlaceholders, FormSRTitles } from '~/constants';

const FieldPassword = ({
  onFocus = () => false,
}) => (
  <CustomField
    autoComplete="current-password"
    fieldId="password"
    fieldName="password"
    fieldType="password"
    onFocus={onFocus}
    labelTitle={FormSRTitles.PASSWORD}
    placeholder={FormInputPlaceholders.PASSWORD}
  />
);

FieldPassword.propTypes = {
  onFocus: PropTypes.func,
};

export default FieldPassword;
