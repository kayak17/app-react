import clsx from 'clsx';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import IconBookmark from '~/icons/bookmark/bookmark';
import {
  getFavoriteOffersIds,
  getFavoriteOffersIdsByUser,
  setFavoriteOffersIds,
} from '~/modules/favorites';
import {
  getIsAuth,
  getUserId,
} from '~/modules/user';
import {
  offerIdPropTypes,
} from '~/prop-types';
import {
  BookmarkBtnClasses,
  BookmarkBtnShapes,
  BookmarkBtnTitles,
  ModalIds,
} from '~/constants';
import {
  getUpdatedFavoriteOffers,
} from '~/utils';

const ButtonBookmark = ({ offerId, bookmarkType }) => {
  const dispatch = useDispatch();
  const favoriteOffersIds = useSelector(getFavoriteOffersIds, shallowEqual);
  const favoriteOffersIdsByUser = useSelector(getFavoriteOffersIdsByUser);
  const isAuth = useSelector(getIsAuth);
  const userId = useSelector(getUserId);

  const isInFavorites = favoriteOffersIdsByUser.length ?
    favoriteOffersIdsByUser.includes(offerId) : false;
  const btnTitle = isInFavorites ?
    BookmarkBtnTitles.IN_BOOKMARKS : BookmarkBtnTitles.TO_BOOKMARKS
  const loginModalId = isAuth ? ModalIds.NONE : ModalIds.LOGIN;

  const handleBookmarkBtnClick = () => {
    if (isAuth && userId) {
      dispatch(setFavoriteOffersIds(
        getUpdatedFavoriteOffers({
          isInFavorites,
          favoriteOffersIds,
          favoriteOffersIdsByUser,
          offerId,
          userId,
        })
      ));
    }
  };

  return (
    <button
      className={
        clsx('bookmark-button', BookmarkBtnClasses[bookmarkType]['btn'],
          {
            [BookmarkBtnClasses[bookmarkType]['btnActive']]:
              isAuth && isInFavorites
          }
        )
      }
      data-modal={loginModalId}
      title={btnTitle}
      type="button"
      onClick={handleBookmarkBtnClick}
    >
      <IconBookmark
        className={BookmarkBtnClasses[bookmarkType]['icon']}
        width={BookmarkBtnShapes[bookmarkType]['width']}
        height={BookmarkBtnShapes[bookmarkType]['height']}
      />
      <span className="visually-hidden">{btnTitle}</span>
    </button>
  );
};

ButtonBookmark.propTypes = {
  offerId: offerIdPropTypes,
  bookmarkType: PropTypes.string.isRequired,
};

export default ButtonBookmark;
