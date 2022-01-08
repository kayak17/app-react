import { Link } from 'react-router-dom';
import { AppRoutes, AppTitles } from '~/constants';

const NavHeaderNoAuth = () => {
  return (
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
  );
};

export default NavHeaderNoAuth;
