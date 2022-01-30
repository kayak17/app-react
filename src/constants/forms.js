import { REVIEW_COMMENT_LENGTH } from './reviews';

export const FORM_FORBIDDEN_SYMBOLS = '< > /';
export const FORM_FORBIDDEN_SYMBOLS_REGEX = /^[^<>/]*$/;

export const FORM_INITIAL_ERROR = undefined;
export const FORM_INITIAL_SUCCESS = undefined;

export const FormInputPlaceholders = {
  EMAIL: 'E-mail',
  NAME: 'Name',
  PASSWORD: 'Password',
  PASSWORD_CONFIRM: 'Password confirmation',
};

export const FormSRTitles = {
  EMAIL: 'E-mail',
  NAME: 'Name',
  PASSWORD: 'Password',
  PASSWORD_CONFIRM: 'Password confirmation',
};

export const FormValidationMessages = {
  COMMENT_LENGTH: `comment must be at least ${REVIEW_COMMENT_LENGTH} characters length`,
  EMAIL_INVALID: 'invalid email',
  FORBIDDEN_SYMBOLS: `don't use forbidden symbols: ${FORM_FORBIDDEN_SYMBOLS}`,
  PASSWORD_INVALID: 'invalid password',
  PASSWORD_CONFIRM_REQUIRED: 'password confirmation is required',
  PASSWORDS_DO_NOT_MATCH: 'passwords must match',
  RATING_STARS_INVALID: 'invalid rating',
  RATING_STARS_REQUIRED: 'rate the offer by clicking on the star sign',
};
