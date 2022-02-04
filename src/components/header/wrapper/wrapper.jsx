import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import HeaderLogoActive from '../logo/active/active';
import HeaderLogoInactive from '../logo/inactive/inactive';
import HeaderNavAuth from '../nav/auth/auth';
import HeaderNavNoAuth from '../nav/no-auth/no-auth';
import { getIsAuth } from '~/modules/user';
import { AppRoutes } from '~/constants';
import '../header.less';

const HeaderWrapper = ({ themeClass }) => {
  const isMainRoute = useMatch(AppRoutes.MAIN);
  const isAuth = useSelector(getIsAuth);

  return (
    <div className={clsx('app-header-container', themeClass)}>
      <header className="container-xl d-flex align-items-center py-3 app-header">
        <nav className="d-flex flex-wrap w-100 app-header-nav">
          {isMainRoute ? <HeaderLogoInactive /> : <HeaderLogoActive />}
          {isAuth ? <HeaderNavAuth /> : <HeaderNavNoAuth />}
        </nav>
      </header>
    </div>
  );
};

HeaderWrapper.propTypes = {
  themeClass: PropTypes.string,
};

export default HeaderWrapper;
