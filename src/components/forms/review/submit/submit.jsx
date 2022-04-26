import PropTypes from 'prop-types';
import FormButtonSubmit from '../../buttons/submit/submit';
import IconStar from '~/icons/star/star';
import { AppTitles, ReviewImgShapes, ReviewTitles } from '~/constants';
import '../review.less';

const FormReviewSubmit = ({ isSubmitting }) => {
  return (
    <div className="d-flex align-items-start justify-content-between">
      <p className="mt-1 fs-6-5">
        {ReviewTitles.TO_SUBMIT_REVIEW}
        <span className="d-inline align-text-bottom form-rating-star-help">
          <IconStar
            className="form-rating-star-image"
            width={ReviewImgShapes.HELP_STAR.width}
            height={ReviewImgShapes.HELP_STAR.height}
          />
          <span className="visually-hidden">star</span>
        </span>
        {ReviewTitles.DESCRIBE_YOUR_STAY}
        <b>{ReviewTitles.TEXT_AMOUNT}</b>
      </p>
      <FormButtonSubmit
        additionalClass="form-rating-submit form-submit"
        isLoading={isSubmitting}
        title={AppTitles.SUBMIT}
      />
    </div>
  );
};

FormReviewSubmit.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
};

export default FormReviewSubmit;

