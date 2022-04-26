import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ModalsLink from '~/components/modals/link/link';
import CustomAlert from '../../custom-elements/alert/alert';
import { AppMessages, AppRoutes, AppTitles, BsStyleTypes } from '~/constants';

const FormSignUpSuccess = ({ isModal }) => {
  return (
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
  );
};

FormSignUpSuccess.propTypes = {
  isModal: PropTypes.bool.isRequired,
};

export default FormSignUpSuccess;

