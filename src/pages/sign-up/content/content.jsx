import FormSignUp from '~/components/forms/sign-up/sign-up';
import { AppTitles } from '~/constants';

const PageSignUpContent = () => {
  return (
    <section className="page-content-wrapper">
      <h1 className="app-title page-content-title">
        {AppTitles.SIGNUP}
      </h1>
      <div className="page-form">
        <FormSignUp />
      </div>
    </section>
  );
};

export default PageSignUpContent;
