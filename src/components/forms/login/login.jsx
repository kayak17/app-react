import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import ButtonCommon from '~/components/buttons/common/common';
import CustomError from '../custom-error/custom-error';
import {
  getIsError,
  getIsLoading,
  login,
  loginError,
} from '~/modules/user';
import {
  AppMessages,
  AppRoutes,
  AppTitles,
  FormSRTitles,
  FormInputPlaceholders,
  InitialModulesValues,
  ModalIds,
} from '~/constants';
import { loginSchema } from '~/utils';

const FormLogin = ({ closeModal, isModal }) => {
  const authError = useSelector(getIsError);
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const onInputFocus = () => {
    dispatch(loginError(InitialModulesValues.ERROR));
  };

  const onSignUpLinkClick = (evt) => {
    evt.preventDefault();
  };

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
          {isModal && (
            <div className="app-form-group form-group">
              <div className="alert alert-info text-center" role="alert">
                <a
                  className="alert-link"
                  data-modal={ModalIds.SIGNUP}
                  href={AppRoutes.SIGNUP}
                  onClick={onSignUpLinkClick}
                >
                  {AppTitles.SIGNUP}
                </a>
                {AppMessages.DONT_HAVE_ACCOUNT}
              </div>
            </div>
          )}
          <div className="app-form-group form-group">
            <ButtonCommon
              additionalClass="app-form-submit"
              isLoading={isLoading}
              title={AppTitles.LOGIN}
            />
          </div>
          {authError && (
            <div className="app-form-group form-group">
              <div className="alert alert-danger text-center" role="alert">
                {authError}
              </div>
            </div>
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
};

export default FormLogin;
