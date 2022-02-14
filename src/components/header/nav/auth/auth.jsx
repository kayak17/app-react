import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CustomNavItem from '~/components/custom-react-bootstrap/nav-item/nav-item';
import { getAuthInfo, logout } from '~/modules/user';
import { APP_DEFAULT_AVATAR, AppImgShapes, AppRoutes, AppTitles } from '~/constants';
import './auth.less';

const HeaderNavAuth = () => {
  const authInfo = useSelector(getAuthInfo, shallowEqual);
  const dispatch = useDispatch();

  const email = authInfo && authInfo.email ? (
    authInfo.email || authInfo.name
  ) : (
    AppTitles.NO_TITLE_EXIST
  );

  const avatar = authInfo && authInfo.avatar ? (
    authInfo.avatar
  ) : (
    APP_DEFAULT_AVATAR
  );

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <NavDropdown
      align="end"
      bsPrefix="d-flex align-items-center p-0 nav-link link-dark
        app-dropdown-toggle app-hover-opacity app-trasition"
      id="header-nav-dropdown"
      title={
        <>
          <img
            className="px-1 rounded-circle"
            alt={AppTitles.USER_AVATAR}
            width={AppImgShapes.USER_AVATAR.width}
            height={AppImgShapes.USER_AVATAR.height}
            src={avatar}
          />
          <span className="app-header-nav-email">{email}</span>
        </>
      }
    >
      <NavDropdown.Item as={NavLink} to={AppRoutes.FAVORITES}>
        <span>{AppTitles.FAVORITES}</span>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={CustomNavItem} onClick={onLogoutClick}>
        <span>{AppTitles.LOGOUT}</span>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default HeaderNavAuth;
