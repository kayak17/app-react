import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import IconBookmark from '~/icons/bookmark/bookmark';
import {
  getOffersIdsMap,
  updateOffersIdsMap,
} from '~/modules/favorites';
import {
  getActiveCityId,
  getActiveCityName,
} from '~/modules/main';
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
  getOffersIdsByUserData,
  getUpdatedOffersIdsMap,
} from '~/utils';

const ButtonBookmark = ({ offerId, bookmarkType }) => {
  const dispatch = useDispatch();
  const activeCityId = useSelector(getActiveCityId);
  const activeCityName = useSelector(getActiveCityName);
  const offersIdsMap = useSelector(getOffersIdsMap, shallowEqual);
  const isAuth = useSelector(getIsAuth);
  const userId = useSelector(getUserId);

  const [offersIdsByUser, setOffersIdsByUser] = useState(
    getOffersIdsByUserData(offersIdsMap, userId)
  );

  const isInFavorites = offersIdsByUser.length ?
    offersIdsByUser.includes(offerId) : false;
  const btnTitle = isInFavorites ?
    BookmarkBtnTitles.IN_BOOKMARKS : BookmarkBtnTitles.TO_BOOKMARKS
  const loginModalId = isAuth ? ModalIds.NONE : ModalIds.LOGIN;

  const handleBookmarkBtnClick = () => {
    if (isAuth && userId) {
      const newOffersIdsMap = getUpdatedOffersIdsMap(
        offersIdsMap, activeCityId, activeCityName, offerId, userId
      );

      dispatch(updateOffersIdsMap(newOffersIdsMap));
      setOffersIdsByUser(getOffersIdsByUserData(newOffersIdsMap, userId));
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
