import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { ErrorMessage, Field } from 'formik';
import CustomError from '../../custom-elements/error/error';
import IconStar from '~/icons/star/star';
import { ReviewFormRatings, ReviewImgShapes } from '~/constants';
import '../review.less';

const FormReviewRating = ({ rating }) => {
  return (
    <>
      <div className="position-relative d-flex flex-row-reverse
        justify-content-end align-items-center mb-1" role="group"
      >
        {ReviewFormRatings.map(({ mark, title }) => (
          <Fragment key={title}>
            <Field
              className="form-rating-input visually-hidden"
              checked={mark === rating}
              id={title}
              name="rating"
              type="radio"
              value={mark}
            />
            <label
              className="form-rating-label me-1"
              htmlFor={title}
              title={title}
            >
              <IconStar
                className="form-rating-star-image"
                width={ReviewImgShapes.FORM_STAR.width}
                height={ReviewImgShapes.FORM_STAR.height}
              />
            </label>
          </Fragment>
        ))}
      </div>
      <ErrorMessage
        name="rating"
        component={CustomError}
      />
    </>
  );
};

FormReviewRating.propTypes = {
  rating: PropTypes.string.isRequired,
};

export default FormReviewRating;

