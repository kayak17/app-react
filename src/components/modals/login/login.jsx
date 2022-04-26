import CustomModal from '~/components/custom-react-bootstrap/modal/modal';
import FormLoginWrapper from '~/components/forms/login/wrapper/wrapper';
import { AppTitles, ModalIds } from '~/constants';
import { ModalCommonPropTypes } from '~/prop-types';

const ModalLogin = ({
  handleClose = () => false,
  isOpen = false,
}) => {
  return (
    <CustomModal
      id={ModalIds.LOGIN}
      show={isOpen}
      title={AppTitles.LOGIN}
      handleClose={handleClose}
    >
      <FormLoginWrapper
        closeModal={handleClose}
        isModal={true}
      />
    </CustomModal>
  );
};

ModalLogin.propTypes = ModalCommonPropTypes;

export default ModalLogin;
