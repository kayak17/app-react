import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import LogoHeaderInactive from '../logo/header/inactive/inactive';
import LogoHeaderActive from '../logo/header/active/active';
import NavHeaderAuth from '../nav/header/auth/auth';
import NavHeaderNoAuth from '../nav/header/no-auth/no-auth';
import { AppRoutes } from '~/constants';

const Header = ({ themeClass }) => {
  const isMainRoute = useMatch(AppRoutes.MAIN);
  const isAuth = useSelector(getIsAuth);

  return (
    <div className={clsx('border-bottom', themeClass)}>
      <header className="container-xl py-3">
        <nav className="d-flex flex-wrap">
          {isMainRoute ? <LogoHeaderInactive /> : <LogoHeaderActive />}
          {isAuth ? <NavHeaderAuth /> : <NavHeaderNoAuth />}
        </nav>
      </header>
    </div>
  );
};

Header.propTypes = {
  themeClass: PropTypes.string,
};

export default Header;
