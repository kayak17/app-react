import PropTypes from 'prop-types';
import HeaderWrapper from '~/components/header/wrapper/wrapper';
import { AppThemeClasses } from '~/constants';

const MainLayout = ({ children }) => {
  return (
    <>
      <HeaderWrapper themeClass={AppThemeClasses.HEADER_DARK} />
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
