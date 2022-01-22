import { Link } from 'react-router-dom';
import { AppRoutes, AppTitles } from '~/constants';

const HeaderLogoActive = () => {
  return (
    <Link
      className="app-subtitle d-flex align-items-center mb-0 me-auto text-dark text-decoration-none"
      to={AppRoutes.MAIN}
    >
      <span className="fs-4">{AppTitles.LOGO_TITLE}</span>
    </Link>
  );
};

export default HeaderLogoActive;
