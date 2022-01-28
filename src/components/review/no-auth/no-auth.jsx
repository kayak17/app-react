import {
  AppRoutes,
  AppTitles,
  ModalIds,
  ReviewTitles,
} from '~/constants';

const ReviewsNoAuth = () => {
  const onLoginLinkClick = (evt) => {
    evt.preventDefault();
  };

  return (
    <div className="alert alert-primary">
      {ReviewTitles.TO_WRITE_REVIEW}
      <a
        className="alert-link"
        data-modal={ModalIds.LOGIN}
        href={AppRoutes.LOGIN}
        onClick={onLoginLinkClick}
      >
        {AppTitles.LOGIN}
      </a>
    </div>
  );
};

export default ReviewsNoAuth;
