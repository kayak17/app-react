import ModalsLink from '~/components/modals/link/link';

const HeaderNavNoAuth = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <ModalsLink
          linkClass={'px-1 nav-link link-dark app-hover-opacity app-trasition'}
          propsConst={'LOGIN'}
        />
      </li>
      <li className="nav-item">
        <span className="px-1 nav-link link-dark">|</span>
      </li>
      <li className="nav-item">
        <ModalsLink
          linkClass={'px-1 nav-link link-dark app-hover-opacity app-trasition'}
          propsConst={'SIGNUP'}
        />
      </li>
    </ul>
  );
};

export default HeaderNavNoAuth;
