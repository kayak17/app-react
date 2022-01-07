import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link, NavLink, useMatch } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CustomNavItem from '../custom-react-bootstrap/nav-item/nav-item';
import { AppRoutes, AppTitles } from '~/constants';

const Header = ({ themeClass }) => {
  const isMainRoute = useMatch(AppRoutes.MAIN);
  const isAuth = true;

  const onLogoutClick = () => {
    alert();
  };

  return (
    <div className={clsx('border-bottom', themeClass)}>
      <header className="container-xl py-3">
        <nav className="d-flex flex-wrap">
          {isMainRoute ? (
            <a
              className="pe-none d-flex align-items-center mb-0 me-auto text-dark text-decoration-none"
              tabIndex="-1"
            >
              <span className="fs-4">{AppTitles.LOGO_TITLE}</span>
            </a>
          ) : (
            <Link
              className="d-flex align-items-center mb-0 me-auto text-dark text-decoration-none"
              to={AppRoutes.MAIN}
            >
              <span className="fs-4">{AppTitles.LOGO_TITLE}</span>
            </Link>
          )}
          {isAuth ? (
            <NavDropdown
              bsPrefix="app-dropdown-toggle link-dark nav-link"
              title="email@email.com"
              id="header-nav-dropdown"
            >
              <NavDropdown.Item as={NavLink} to={AppRoutes.FAVORITES}>
                <span>{AppTitles.FAVORITES}</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={CustomNavItem} onClick={onLogoutClick}>
                <span>{AppTitles.LOGOUT}</span>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <ul className="nav">
              <li className="nav-item">
                <Link
                  className="nav-link link-dark px-1"
                  to={AppRoutes.LOGIN}
                >
                  <span>{AppTitles.LOGIN}</span>
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link link-dark px-1">|</span>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link link-dark px-1"
                  to={AppRoutes.SIGNUP}
                >
                  <span>{AppTitles.SIGNUP}</span>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </header>
    </div>
  );
};

Header.propTypes = {
  themeClass: PropTypes.string.isRequired,
};

export default Header;
