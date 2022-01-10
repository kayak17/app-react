import { lazy } from 'react';
import PropTypes from 'prop-types';
import ModalBackdrop from '../backdrop/backdrop';
import withLazy from '~/hocs/with-lazy/with-lazy';
import { ModalIds } from '~/constants';

const ModalLogin = withLazy(
  lazy(() => import('../login/login')),
  <ModalBackdrop />
);

const ModalSignUp = withLazy(
  lazy(() => import('../sign-up/sign-up')),
  <ModalBackdrop />
);

const ModalsManager = ({ handleClose, modal }) => {
  const getModal = () => {
    switch (modal) {
      case ModalIds.LOGIN:
        return <ModalLogin
          handleClose={handleClose}
          isOpen={true}
        />;
      case ModalIds.SIGNUP:
        return <ModalSignUp
          handleClose={handleClose}
          isOpen={true}
        />;
      default:
        return null;
    }
  };

  return getModal();
};

ModalsManager.propTypes = {
  handleClose: PropTypes.func.isRequired,
  modal: PropTypes.string.isRequired,
};

export default ModalsManager;
