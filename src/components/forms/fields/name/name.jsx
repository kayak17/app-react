import PropTypes from 'prop-types';
import CustomField from '~/components/forms/custom-elements/field/field';
import { FormInputPlaceholders, FormSRTitles } from '~/constants';

const FieldName = ({
  onFocus = () => false,
}) => (
  <CustomField
    autoComplete="username"
    fieldId="name"
    fieldName="name"
    fieldType="name"
    onFocus={onFocus}
    labelTitle={FormSRTitles.NAME}
    placeholder={FormInputPlaceholders.NAME}
  />
);

FieldName.propTypes = {
  onFocus: PropTypes.func,
};

export default FieldName;
