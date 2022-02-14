import PropTypes from 'prop-types';
import { Fragment, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import CustomAlert from '../custom-elements/alert/alert';
import CustomError from '../custom-elements/error/error';
import FieldPropertyReview from '../fields/property-review/property-review';
import FormButtonSubmit from '~/components/forms/buttons/submit/submit';
import IconStar from '~/icons/star/star';
import { getAuthToken } from '~/modules/user';
import { sendFormRequest } from '~/services';
import {
  APIRoutes,
  AppMessages,
  AppTitles,
  BsStyleTypes,
  ResponseStatusTexts,
  ReviewFormRatings,
  reviewImgShapes,
  ReviewTitles,
  FORM_INITIAL_ERROR,
  FORM_INITIAL_SUCCESS,
} from '~/constants';
import {
  getAuthHeader,
  isOfferIdValid,
} from '~/utils';
import {
  reviewSchema,
} from './validation';
import './review.less';

const FormReview = ({ offerId }) => {
  const authToken = useSelector(getAuthToken);
  const [reviewError, setReviewError] = useState(FORM_INITIAL_ERROR);
  const [reviewSuccess, setReviewSuccess] = useState(FORM_INITIAL_SUCCESS);

  const initialValues = {
    rating: '',
    comment: '',
  };

  const onTextareaFocus = useCallback(() => {
    setReviewError(FORM_INITIAL_ERROR);
  }, [setReviewError]);

  const onSubmit = (values, { resetForm, setSubmitting }) => {
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
      onSubmit={onSubmit}
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
                      checked={mark === values.rating}
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
                        width={reviewImgShapes.FORM_STAR.width}
                        height={reviewImgShapes.FORM_STAR.height}
                      />
                    </label>
                  </Fragment>
                ))}
              </div>
              <ErrorMessage
                name="rating"
                component={CustomError}
              />
              <FieldPropertyReview onFocus={onTextareaFocus} />
              <div className="d-flex align-items-start justify-content-between">
                <p className="mt-1 fs-6-5">
                  {ReviewTitles.TO_SUBMIT_REVIEW}
                  <span className="d-inline align-text-bottom form-rating-star-help">
                    <IconStar
                      className="form-rating-star-image"
                      width={reviewImgShapes.HELP_STAR.width}
                      height={reviewImgShapes.HELP_STAR.height}
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
              {reviewError && (
                <CustomAlert
                  alertClass="mt-3"
                  alertType={BsStyleTypes.DANGER}
                >
                  {reviewError}
                </CustomAlert>
              )}
            </>
          ) : (
            <CustomAlert
              alertClass="mt-3"
              alertType={BsStyleTypes.SUCCESS}
            >
              {AppMessages.REVIEW_POSTING_SUCCESS}
            </CustomAlert>
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
