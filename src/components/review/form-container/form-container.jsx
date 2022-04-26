import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ModalsLink from '~/components/modals/link/link';
import FormReviewWrapper from '~/components/forms/review/wrapper/wrapper';
import { getIsAuth } from '~/modules/user';
import { ReviewTitles } from '~/constants';

const ReviewFormContainer = ({ offerId, fetchReviews }) => {
  const isAuth = useSelector(getIsAuth);

  if (isAuth) {
    return (
      <>
        <p className="text-start fw-bold fst-italic">
          {ReviewTitles.YOUR_REVIEW}
        </p>
        <FormReviewWrapper
          offerId={offerId}
          fetchReviews={fetchReviews}
        />
      </>
    );
  }

  return (
    <div className="alert alert-primary" role="alert">
      {ReviewTitles.TO_WRITE_REVIEW}
      <ModalsLink
        linkClass={'alert-link'}
        isLowerCase={true}
        propsConst={'LOGIN'}
      />
    </div>
  );
};

ReviewFormContainer.propTypes = {
  offerId: PropTypes.number.isRequired,
  fetchReviews: PropTypes.func.isRequired,
};

export default ReviewFormContainer;
