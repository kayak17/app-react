import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import FormButtonSubmit from '../buttons/submit/submit';
import CustomAlert from '../custom-elements/alert/alert';
import FieldEmail from '../fields/email/email';
import FieldPassword from '../fields/password/password';
import ModalsLink from '~/components/modals/link/link';
import {
  getIsError,
  getIsLoading,
  login,
  loginError,
} from '~/modules/user';
import {
  AppMessages,
  AppTitles,
  BsStyleTypes,
  InitialModulesValues,
} from '~/constants';
import { loginSchema } from './validation';

const FormLogin = ({ closeModal, isModal, navigate }) => {
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
            <CustomAlert>
              <>
                <ModalsLink
                  linkClass={'alert-link'}
                  propsConst={'SIGNUP'}
                />
                {AppMessages.DONT_HAVE_ACCOUNT}
              </>
            </CustomAlert>
          )}
          <div className="app-form-group form-group">
            <FormButtonSubmit
              additionalClass="app-form-submit"
              isLoading={isLoading}
              title={AppTitles.LOGIN}
            />
          </div>
          {authError && (
            <CustomAlert alertType={BsStyleTypes.DANGER}>
              {authError}
            </CustomAlert>
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

FormLogin.propTypes = {
  closeModal: PropTypes.func,
  isModal: PropTypes.bool,
  navigate: PropTypes.func,
};

export default FormLogin;
