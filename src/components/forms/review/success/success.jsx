import PropTypes from 'prop-types';
import CustomAlert from '../../custom-elements/alert/alert';
import { AppMessages, BsStyleTypes } from '~/constants';

const FormReviewSuccess = ({ handleCloseBtnClick }) => {
  return (
    <CustomAlert
      alertClass="d-flex mt-3"
      alertType={BsStyleTypes.SUCCESS}
    >
      <>
        <span className="ms-auto">
          {AppMessages.REVIEW_POSTING_SUCCESS}
        </span>
        <button
          className="ms-auto btn-close"
          aria-label="Close"
          type="button"
          onClick={handleCloseBtnClick}
        ></button>
      </>
    </CustomAlert>
  );
};

FormReviewSuccess.propTypes = {
  handleCloseBtnClick: PropTypes.func.isRequired,
};

export default FormReviewSuccess;

