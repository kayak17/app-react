import * as yup from 'yup';
import * as yupPassword from 'yup-password';
import {
  FORM_FORBIDDEN_SYMBOLS_REGEX,
  FormValidationMessages,
} from '~/constants';

yupPassword(yup);

const commonFieldRule = yup.string().strict(true).required().trim()
  .matches(FORM_FORBIDDEN_SYMBOLS_REGEX, FormValidationMessages.FORBIDDEN_SYMBOLS);

const commonEmailRule = commonFieldRule
  .email(FormValidationMessages.EMAIL_INVALID);

export const loginSchema = yup.object().shape({
  email: commonEmailRule,
  password: commonFieldRule,
});

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
