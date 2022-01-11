import FormLogin from '~/components/forms/login/login';
import { AppTitles } from '~/constants';

const PageLoginContent = () => {
  return (
    <section className="page-content-wrapper">
      <h1 className="app-title page-content-title">
        {AppTitles.LOGIN}
      </h1>
      <div className="page-form">
        <FormLogin />
      </div>
    </section>
  );
};

export default PageLoginContent;
