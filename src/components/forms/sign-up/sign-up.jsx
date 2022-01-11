import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import ButtonCommon from '~/components/buttons/common/common';
import CustomError from '../custom-error/custom-error';
import { sendFormRequest } from '~/services';
import {
  APIRoutes,
  AppMessages,
  AppRoutes,
  AppTitles,
  ModalIds,
  FormInputPlaceholders,
  FormSRTitles,
  ResponseStatusTexts,
  FORM_INITIAL_ERROR,
  FORM_INITIAL_SUCCESS,
} from '~/constants';
import { signUpSchema } from '~/utils';

const FormSignUp = ({ isModal }) => {
  const [signUpError, setSignUpError] = useState(FORM_INITIAL_ERROR);
  const [signUpSuccess, setSignUpSuccess] = useState(FORM_INITIAL_SUCCESS);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const onInputFocus = () => {
    setSignUpError(FORM_INITIAL_ERROR);
  };

  const onLoginLinkClick = (evt) => {
    if (isModal) {
      evt.preventDefault();
    }
  };

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    sendFormRequest({
      data: values,
      resetForm,
      setError: setSignUpError,
      setSubmitting,
      setSuccess: setSignUpSuccess,
      responseStatusText: ResponseStatusTexts.CREATED,
      url: APIRoutes.SIGNUP,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {!signUpSuccess ? (
            <>
              <div className="app-form-group form-group">
                <label className="visually-hidden" htmlFor="name">
                  {FormSRTitles.NAME}
                </label>
                <Field
                  className="app-form-control form-control"
                  type="name"
                  name="name"
                  autoComplete="given-name"
                  placeholder={FormInputPlaceholders.NAME}
                  onFocus={onInputFocus}
                />
                <ErrorMessage
                  name="name"
                  component={CustomError}
                />
              </div>

              <div className="app-form-group form-group">
                <label className="visually-hidden" htmlFor="email">
                  {FormSRTitles.EMAIL}
                </label>
                <Field
                  className="app-form-control form-control"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={FormInputPlaceholders.EMAIL}
                  onFocus={onInputFocus}
                />
                <ErrorMessage
                  name="email"
                  component={CustomError}
                />
              </div>

              <div className="app-form-group form-group">
                <label className="visually-hidden" htmlFor="password">
                  {FormSRTitles.PASSWORD}
                </label>
                <Field
                  className="app-form-control form-control"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder={FormInputPlaceholders.PASSWORD}
                  onFocus={onInputFocus}
                />
                <ErrorMessage
                  name="password"
                  component={CustomError}
                />
              </div>

              <div className="app-form-group form-group">
                <label className="visually-hidden" htmlFor="passwordConfirm">
                  {FormSRTitles.PASSWORD}
                </label>
                <Field
                  className="app-form-control form-control"
                  type="password"
                  name="passwordConfirm"
                  autoComplete="new-password"
                  placeholder={FormInputPlaceholders.PASSWORD_CONFIRM}
                  onFocus={onInputFocus}
                />
                <ErrorMessage
                  name="passwordConfirm"
                  component={CustomError}
                />
              </div>

              <div className="app-form-group form-group">
                <ButtonCommon
                  additionalClass="app-form-submit"
                  isLoading={isSubmitting}
                  title={AppTitles.SIGNUP}
                />
              </div>
              {signUpError && (
                <div className="app-form-group form-group">
                  <div
                    className="alert alert-danger text-center"
                    role="alert"
                  >
                    {signUpError}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="app-form-group form-group">
              <div
                className="alert alert-success text-center"
                role="alert"
              >
                <div>{AppMessages.SIGNUP_SUCCESS}</div>
                <div>
                  {isModal ? (
                    <a
                      className="alert-link"
                      data-modal={ModalIds.LOGIN}
                      href={AppRoutes.LOGIN}
                      onClick={onLoginLinkClick}
                    >
                      {AppTitles.LOGIN}
                    </a>
                  ) : (
                    <Link
                      className="alert-link"
                      to={AppRoutes.LOGIN}
                    >
                      <span>{AppTitles.LOGIN}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

FormSignUp.propTypes = {
  isModal: PropTypes.bool,
};

export default FormSignUp;
