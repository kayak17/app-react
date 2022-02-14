import * as yup from 'yup';
import { FORM_FORBIDDEN_SYMBOLS_REGEX, FormValidationMessages } from '~/constants';

export const commonFieldRule = yup.string().strict(true).required().trim()
  .matches(FORM_FORBIDDEN_SYMBOLS_REGEX, FormValidationMessages.FORBIDDEN_SYMBOLS);

export const commonEmailRule = commonFieldRule
  .email(FormValidationMessages.EMAIL_INVALID);
