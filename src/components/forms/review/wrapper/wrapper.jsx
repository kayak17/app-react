import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import ErrorAlert from '../../common/error-alert/error-alert';
import FieldPropertyReview from '../../fields/property-review/property-review';
import FormReviewRating from '../rating/rating';
import FormReviewSubmit from '../submit/submit';
import FormReviewSuccess from '../success/success';
import { getAuthToken } from '~/modules/user';
import { sendFormRequest } from '~/services';
import { reviewSchema } from '../validation';
import {
  APIRoutes,
  AppMessages,
  ResponseStatusTexts,
  FORM_INITIAL_ERROR,
  FORM_INITIAL_SUCCESS,
} from '~/constants';
import {
  getAuthHeader,
  isOfferIdValid,
} from '~/utils';
import '../review.less';

const FormReviewWrapper = ({ offerId, fetchReviews }) => {
  const authToken = useSelector(getAuthToken);
  const [reviewError, setReviewError] = useState(FORM_INITIAL_ERROR);
  const [reviewSuccess, setReviewSuccess] = useState(FORM_INITIAL_SUCCESS);

  const initialValues = {
    rating: '',
    comment: '',
  };

  const onTextareaFocus = useCallback(() => {
    setReviewError(FORM_INITIAL_ERROR);
  }, []);

  const onCloseBtnClick = useCallback((evt) => {
    evt.preventDefault();

    setReviewSuccess(FORM_INITIAL_ERROR);
    setReviewError(FORM_INITIAL_ERROR);
    fetchReviews();
  }, [fetchReviews]);

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

  if (reviewSuccess) {
    return (
      <FormReviewSuccess handleCloseBtnClick={onCloseBtnClick} />
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={reviewSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <FormReviewRating rating={values.rating} />
          <FieldPropertyReview onFocus={onTextareaFocus} />
          <FormReviewSubmit isSubmitting={isSubmitting} />
          {reviewError && (
            <ErrorAlert alertClass="mt-3" errorMsg={reviewError} />
          )}
        </Form>
      )}
    </Formik>
  );
};

FormReviewWrapper.propTypes = {
  offerId: PropTypes.number.isRequired,
  fetchReviews: PropTypes.func.isRequired,
};

export default FormReviewWrapper;
