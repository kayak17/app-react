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
  EMAIL_INVALID: 'invalid email',
  FORBIDDEN_SYMBOLS: `don't use forbidden symbols: ${FORM_FORBIDDEN_SYMBOLS}`,
  PASSWORD_INVALID: 'invalid password',
  PASSWORD_CONFIRM_REQUIRED: 'password confirmation is required',
  PASSWORDS_DO_NOT_MATCH: 'passwords must match',
};
