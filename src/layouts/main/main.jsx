import clsx from 'clsx';
import PropTypes from 'prop-types';
import Header from '~/components/header/header';
import { AppThemeClasses } from '~/constants';

const MainLayout = ({ additionalClass, children }) => {
  return (
    <div className={clsx('app-page', additionalClass)}>
      <Header themeClass={AppThemeClasses.HEADER_DARK} />
      <main className="app-container">
        {children}
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  additionalClass: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default MainLayout;
