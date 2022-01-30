import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import ButtonCommon from '~/components/buttons/common/common';
import CustomError from '../custom-error/custom-error';
import IconStar from '~/icons/star/star';
import { getAuthToken } from '~/modules/user';
import { sendFormRequest } from '~/services';
import {
  APIRoutes,
  AppMessages,
  AppTitles,
  ResponseStatusTexts,
  ReviewFormRatings,
  ReviewTitles,
  FORM_INITIAL_ERROR,
  FORM_INITIAL_SUCCESS,
  REVIEW_IMG_SHAPES,
} from '~/constants';
import {
  getAuthHeader,
  isOfferIdValid,
  reviewSchema,
} from '~/utils';
import './review.less';

const FormReview = ({ offerId }) => {
  const authToken = useSelector(getAuthToken);
  const [reviewError, setReviewError] = useState(FORM_INITIAL_ERROR);
  const [reviewSuccess, setReviewSuccess] = useState(FORM_INITIAL_SUCCESS);

  const initialValues = {
    rating: '',
    comment: '',
  };

  const handleTextareaFocus = () => {
    setReviewError(FORM_INITIAL_ERROR);
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const { rating, comment } = values;
    const parsedOfferId = parseInt(offerId, 10);
    const parsedRating = parseInt(rating, 10);

    if (!isOfferIdValid(parsedOfferId)) {
      setReviewError(AppMessages.INCORRECT_OFFERID);
      setSubmitting(false);
      throw new Error(AppMessages.INCORRECT_OFFERID);
    } else {
      sendFormRequest({
        config: getAuthHeader(authToken),
        data: {
          comment,
          offerId: parsedOfferId,
          rating: parsedRating,
        },
        resetForm,
        setError: setReviewError,
        setSubmitting,
        setSuccess: setReviewSuccess,
        responseStatusText: ResponseStatusTexts.CREATED,
        url: APIRoutes.REVIEWS,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={reviewSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          {!reviewSuccess ? (
            <>
              <div className="position-relative d-flex flex-row-reverse
                justify-content-end align-items-center mb-1" role="group"
              >
                {ReviewFormRatings.map(({ mark, title }) => (
                  <Fragment key={title}>
                    <Field
                      className="form-rating-input visually-hidden"
                      type="radio"
                      name="rating"
                      value={mark}
                      id={title}
                      checked={mark === values.rating}
                    />
                    <label
                      className="form-rating-label me-1"
                      htmlFor={title}
                      title={title}
                    >
                      <IconStar
                        className="form-rating-star-image"
                        width={REVIEW_IMG_SHAPES.FORM_STAR.width}
                        height={REVIEW_IMG_SHAPES.FORM_STAR.height}
                      />
                    </label>
                  </Fragment>
                ))}
              </div>
              <ErrorMessage
                name="rating"
                component={CustomError}
              />
              <Field
                className="mt-3 mb-2 px-3 py-3 form-rating-textarea form-control"
                component="textarea"
                name="comment"
                placeholder={ReviewTitles.TEXTAREA_PLACEHOLDER}
                onFocus={handleTextareaFocus}
              />
              <ErrorMessage
                name="comment"
                component={CustomError}
              />
              <div className="d-flex align-items-start justify-content-between">
                <p className="mt-1 fs-6-5">
                  {ReviewTitles.TO_SUBMIT_REVIEW}
                  <span className="d-inline align-text-bottom form-rating-star-help">
                    <IconStar
                      className="form-rating-star-image"
                      width={REVIEW_IMG_SHAPES.HELP_STAR.width}
                      height={REVIEW_IMG_SHAPES.HELP_STAR.height}
                    />
                    <span className="visually-hidden">star</span>
                  </span>
                  {ReviewTitles.DESCRIBE_YOUR_STAY}
                  <b>{ReviewTitles.TEXT_AMOUNT}</b>
                </p>
                <ButtonCommon
                  additionalClass="form-rating-submit form-submit"
                  isLoading={isSubmitting}
                  title={AppTitles.SUBMIT}
                />
              </div>
              {reviewError && (
                <div className="mt-3 alert alert-danger text-center" role="alert">
                  {reviewError}
                </div>
              )}
            </>
          ) : (
            <div className="mt-3 alert alert-success text-center" role="alert">
              {AppMessages.REVIEW_POSTING_SUCCESS}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

FormReview.propTypes = {
  offerId: PropTypes.number.isRequired,
};

export default FormReview;
