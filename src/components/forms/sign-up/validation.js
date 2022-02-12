import * as yup from 'yup';
import * as yupPassword from 'yup-password';
import { FormValidationMessages } from '~/constants';
import { commonEmailRule, commonFieldRule } from '~/utils';

yupPassword(yup);

export const signUpSchema = yup.object().shape({
  name: commonFieldRule,
  email: commonEmailRule,
  password: commonFieldRule
    .password(FormValidationMessages.PASSWORD_INVALID)
    .min(6).minNumbers(1).minSymbols(0).minUppercase(0),
  passwordConfirm: commonFieldRule
    .oneOf([yup.ref('password')], FormValidationMessages.PASSWORDS_DO_NOT_MATCH)
    .required(FormValidationMessages.PASSWORD_CONFIRM_REQUIRED),
});
