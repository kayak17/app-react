import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import IconBookmark from '~/icons/bookmark/bookmark';
import { getFavoritesIds, updateFavorites } from '~/modules/favorites';
import { getIsAuth } from '~/modules/user';
import { offerIdPropTypes } from '~/prop-types';
import {
  BookmarkBtnClasses,
  BookmarkBtnShapes,
  BookmarkBtnTitles,
  ModalIds,
} from '~/constants';
import './bookmark.less';

const ButtonBookmark = ({ offerId, bookmarkType }) => {
  const favoritesIds = useSelector(getFavoritesIds);
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  const isInFavorites = favoritesIds.length ?
    favoritesIds.includes(offerId) : false;
  const btnTitle = isInFavorites ?
    BookmarkBtnTitles.IN_BOOKMARKS : BookmarkBtnTitles.TO_BOOKMARKS
  const modalId = isAuth ? ModalIds.NONE : ModalIds.LOGIN;

  const onBookmarkBtnClick = () => {
    if (isAuth) {
      dispatch(updateFavorites(offerId));
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
      data-modal={modalId}
      title={btnTitle}
      type="button"
      onClick={onBookmarkBtnClick}
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
