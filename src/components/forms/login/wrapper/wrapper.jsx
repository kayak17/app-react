import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import ErrorAlert from '../../common/error-alert/error-alert';
import FieldEmail from '../../fields/email/email';
import FieldPassword from '../../fields/password/password';
import FormButtonSubmit from '../../buttons/submit/submit';
import FormLoginInfoMsgModal from '../info-msg-modal/info-msg-modal';
import { loginSchema } from '../validation';
import {
  getIsError,
  getIsLoading,
  login,
  loginError,
} from '~/modules/user';
import {
  AppTitles,
  InitialModulesValues,
} from '~/constants';

const FormLoginWrapper = ({ closeModal, isModal, navigate }) => {
  const authError = useSelector(getIsError);
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const onInputFocus = useCallback(() => {
    dispatch(loginError(InitialModulesValues.ERROR));
  }, [dispatch]);

  const onSubmit = (values) => {
    const { email, password } = values;
    dispatch(login({ email, password, closeModal, navigate }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <FieldEmail onFocus={onInputFocus} />
          <FieldPassword onFocus={onInputFocus} />
          {isModal && (
            <FormLoginInfoMsgModal />
          )}
          <div className="app-form-group form-group">
            <FormButtonSubmit
              additionalClass="app-form-submit"
              isLoading={isLoading}
              title={AppTitles.LOGIN}
            />
          </div>
          {authError && (
            <ErrorAlert errorMsg={authError} />
          )}
          {/* for demo only */}
          <div className="app-form-group form-group">
            <div>email: admin@admin.com</div>
            <div>passsword: admin1</div>
          </div>
          {/* for demo only */}
        </Form>
      )}
    </Formik>
  );
};

FormLoginWrapper.propTypes = {
  closeModal: PropTypes.func,
  isModal: PropTypes.bool,
  navigate: PropTypes.func,
};

export default FormLoginWrapper;
