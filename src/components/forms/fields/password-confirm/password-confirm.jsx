import PropTypes from 'prop-types';
import CustomField from '~/components/forms/custom-elements/field/field';
import { FormInputPlaceholders, FormSRTitles } from '~/constants';

const FieldPasswordConfirm = ({
  onFocus = () => false,
}) => (
  <CustomField
    autoComplete="new-password"
    fieldId="passwordConfirm"
    fieldName="passwordConfirm"
    fieldType="password"
    onFocus={onFocus}
    labelTitle={FormSRTitles.PASSWORD_CONFIRM}
    placeholder={FormInputPlaceholders.PASSWORD_CONFIRM}
  />
);

FieldPasswordConfirm.propTypes = {
  onFocus: PropTypes.func,
};

export default FieldPasswordConfirm;
