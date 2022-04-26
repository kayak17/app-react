import ModalsLink from '~/components/modals/link/link';
import CustomAlert from '../../custom-elements/alert/alert';
import { AppMessages } from '~/constants';

const FormLoginInfoMsgModal = () => {
  return (
    <CustomAlert>
      <>
        <ModalsLink
          linkClass={'alert-link'}
          propsConst={'SIGNUP'}
        />
        {AppMessages.DONT_HAVE_ACCOUNT}
      </>
    </CustomAlert>
  );
};

export default FormLoginInfoMsgModal;

