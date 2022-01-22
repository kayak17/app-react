import { AppRoutes, AppTitles, ModalIds } from '~/constants';

const HeaderNavNoAuth = () => {
  const handleClick = (evt) => {
    evt.preventDefault();
  };

  return (
    <ul className="nav">
      <li className="nav-item">
        <a
          className="nav-link link-dark px-1"
          href={AppRoutes.LOGIN}
          data-modal={ModalIds.LOGIN}
          onClick={handleClick}
        >
          {AppTitles.LOGIN}
        </a>
      </li>
      <li className="nav-item">
        <span className="nav-link link-dark px-1">|</span>
      </li>
      <li className="nav-item">
        <a
          className="nav-link link-dark px-1"
          href={AppRoutes.SIGNUP}
          data-modal={ModalIds.SIGNUP}
          onClick={handleClick}
        >
          {AppTitles.SIGNUP}
        </a>
      </li>
    </ul>
  );
};

export default HeaderNavNoAuth;
