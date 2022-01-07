import PropTypes from 'prop-types';
import Header from '~/components/header/header';
import { AppThemeClasses } from '~/constants';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header themeClass={AppThemeClasses.HEADER_DARK} />
      <main className="container-xl px-0">
        {children}
      </main>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
