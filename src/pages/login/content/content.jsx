import FormLoginWrapper from '~/components/forms/login/wrapper/wrapper';
import useRouterNavigate from '~/hooks/use-router-navigate/use-router-navigate';
import { AppTitles } from '~/constants';

const PageLoginContent = () => {
  const navigate = useRouterNavigate();

  return (
    <section className="page-content-wrapper">
      <h1 className="app-title page-content-title">
        {AppTitles.LOGIN}
      </h1>
      <div className="page-form">
        <FormLoginWrapper navigate={navigate} />
      </div>
    </section>
  );
};

export default PageLoginContent;
