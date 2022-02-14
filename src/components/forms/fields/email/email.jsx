import PropTypes from 'prop-types';
import CustomField from '~/components/forms/custom-elements/field/field';
import { FormInputPlaceholders, FormSRTitles } from '~/constants';

const FieldEmail = ({
  onFocus = () => false,
}) => (
  <CustomField
    autoComplete="email"
    fieldId="email"
    fieldName="email"
    fieldType="email"
    onFocus={onFocus}
    labelTitle={FormSRTitles.EMAIL}
    placeholder={FormInputPlaceholders.EMAIL}
  />
);

FieldEmail.propTypes = {
  onFocus: PropTypes.func,
};

export default FieldEmail;
