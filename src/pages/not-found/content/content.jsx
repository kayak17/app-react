import { Link } from 'react-router-dom';
import { AppRoutes, AppTitles } from '~/constants';

const PageNotFoundContent = () => {
  return (
    <section className="page-content-wrapper">
      <h1 className="app-title page-content-title">
        {AppTitles.PAGE_NOT_FOUND}
      </h1>
      <Link
        className="d-flex justify-content-center text-dark"
        to={AppRoutes.MAIN}
      >
        {AppTitles.GO_TO_MAIN_PAGE}
      </Link>
    </section>
  );
};

export default PageNotFoundContent;
