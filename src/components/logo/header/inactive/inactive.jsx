import { AppTitles } from '~/constants';

const LogoHeaderInactive = () => {
  return (
    <a
      className="app-subtitle pe-none d-flex align-items-center mb-0 me-auto text-dark text-decoration-none"
      tabIndex="-1"
    >
      <span className="fs-4">{AppTitles.LOGO_TITLE}</span>
    </a>
  );
};

export default LogoHeaderInactive;
