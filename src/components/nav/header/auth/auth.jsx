import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CustomNavItem from '~/components/custom-react-bootstrap/nav-item/nav-item';
import { getAuthInfo, logout } from '~/modules/user';
import { APP_DEFAULT_AVATAR, AppRoutes, AppTitles } from '~/constants';

const NavHeaderAuth = () => {
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
      bsPrefix="app-dropdown-toggle link-dark nav-link px-0"
      id="header-nav-dropdown"
      title={
        <span>
          <img
            className="rounded-circle px-1"
            src={avatar}
            alt="avatar"
            width="32"
            height="32"
          />
          {email}
        </span>
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

export default NavHeaderAuth;
