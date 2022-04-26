import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Formik, Form } from 'formik';
import FormButtonSubmit from '../../buttons/submit/submit';
import ErrorAlert from '../../common/error-alert/error-alert';
import FieldEmail from '../../fields/email/email';
import FieldName from '../../fields/name/name';
import FieldPassword from '../../fields/password/password';
import FieldPasswordConfirm from '../../fields/password-confirm/password-confirm';
import FormSignUpSuccess from '../success/success';
import { sendFormRequest } from '~/services';
import { signUpSchema } from '../validation';
import {
  APIRoutes,
  AppTitles,
  ResponseStatusTexts,
  FORM_INITIAL_ERROR,
  FORM_INITIAL_SUCCESS,
} from '~/constants';

const FormSignUpWrapper = ({ isModal }) => {
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

  if (signUpSuccess) {
    return (
      <FormSignUpSuccess isModal={isModal} />
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
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
            <ErrorAlert errorMsg={signUpError} />
          )}
        </Form>
      )}
    </Formik>
  );
};

FormSignUpWrapper.propTypes = {
  isModal: PropTypes.bool,
};

export default FormSignUpWrapper;
