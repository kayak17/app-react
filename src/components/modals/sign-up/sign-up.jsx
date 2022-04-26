import CustomModal from '~/components/custom-react-bootstrap/modal/modal';
import FormSignUpWrapper from '~/components/forms/sign-up/wrapper/wrapper';
import { AppTitles, ModalIds } from '~/constants';
import { ModalCommonPropTypes } from '~/prop-types';

const ModalSignUp = ({
  handleClose = () => false,
  isOpen = false,
}) => {
  return (
    <CustomModal
      id={ModalIds.SIGNUP}
      show={isOpen}
      title={AppTitles.SIGNUP}
      handleClose={handleClose}
    >
      <FormSignUpWrapper
        closeModal={handleClose}
        isModal={true}
      />
    </CustomModal>
  );
};

ModalSignUp.propTypes = ModalCommonPropTypes;

export default ModalSignUp;
