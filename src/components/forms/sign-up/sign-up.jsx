import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import CustomAlert from '../custom-elements/alert/alert';
import FormButtonSubmit from '../buttons/submit/submit';
import FieldEmail from '../fields/email/email';
import FieldName from '../fields/name/name';
import FieldPassword from '../fields/password/password';
import FieldPasswordConfirm from '../fields/password-confirm/password-confirm';
import ModalsLink from '~/components/modals/link/link';
import { sendFormRequest } from '~/services';
import {
  APIRoutes,
  AppMessages,
  AppRoutes,
  AppTitles,
  BsStyleTypes,
  ResponseStatusTexts,
  FORM_INITIAL_ERROR,
  FORM_INITIAL_SUCCESS,
} from '~/constants';
import { signUpSchema } from './validation';

const FormSignUp = ({ isModal }) => {
  const [signUpError, setSignUpError] = useState(FORM_INITIAL_ERROR);
  const [signUpSuccess, setSignUpSuccess] = useState(FORM_INITIAL_SUCCESS);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const onInputFocus = useCallback(() => {
    setSignUpError(FORM_INITIAL_ERROR);
  }, []);

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
              <FieldName onFocus={onInputFocus} />
              <FieldEmail onFocus={onInputFocus} />
              <FieldPassword onFocus={onInputFocus} />
              <FieldPasswordConfirm onFocus={onInputFocus} />
              <div className="app-form-group form-group">
                <FormButtonSubmit
                  additionalClass="app-form-submit"
                  isLoading={isSubmitting}
                  title={AppTitles.SIGNUP}
                />
              </div>
              {signUpError && (
                <CustomAlert alertType={BsStyleTypes.DANGER}>
                  {signUpError}
                </CustomAlert>
              )}
            </>
          ) : (
            <CustomAlert alertType={BsStyleTypes.SUCCESS}>
              <>
                <div>{AppMessages.SIGNUP_SUCCESS}</div>
                <div>
                  {isModal ? (
                    <ModalsLink
                      linkClass={'alert-link'}
                      propsConst={'LOGIN'}
                    />
                  ) : (
                    <Link
                      className="alert-link"
                      to={AppRoutes.LOGIN}
                    >
                      <span>{AppTitles.LOGIN}</span>
                    </Link>
                  )}
                </div>
              </>
            </CustomAlert>
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
