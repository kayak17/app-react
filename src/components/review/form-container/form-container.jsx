import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ModalsLink from '~/components/modals/link/link';
import FormReview from '~/components/forms/review/review';
import { getIsAuth } from '~/modules/user';
import { ReviewTitles } from '~/constants';

const ReviewFormContainer = ({ offerId }) => {
  const isAuth = useSelector(getIsAuth);

  if (isAuth) {
    <>
      <p className="text-start fw-bold fst-italic">
        {ReviewTitles.YOUR_REVIEW}
      </p>
      <FormReview offerId={offerId} />
    </>
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
};

export default ReviewFormContainer;
