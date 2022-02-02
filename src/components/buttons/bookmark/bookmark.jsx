import PropTypes from 'prop-types';
import clsx from 'clsx';
import IconBookmark from '~/icons/bookmark/bookmark';
import { getIsAuth } from '~/modules/user';
import { offerIdPropTypes } from '~/prop-types';
import {
  BookmarkBtnClasses,
  BookmarkBtnShapes,
  BookmarkBtnTitles,
  ModalIds,
} from '~/constants';

const ButtonBookmark = ({ offerId, bookmarkType }) => {
  const isAuth = useSelector(getIsAuth);

  const isInFavorites = false;
  const btnTitle = isInFavorites ?
    BookmarkBtnTitles.IN_BOOKMARKS : BookmarkBtnTitles.TO_BOOKMARKS
  const loginModalId = isAuth ? ModalIds.NONE : ModalIds.LOGIN;

  const handleBookmarkBtnClick = () => {
    if (isAuth) {
      console.log(offerId);
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
      type="button"
      title={btnTitle}
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
