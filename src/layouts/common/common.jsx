import PropTypes from 'prop-types';
import Header from '~/components/header/header';

const CommonLayout = ({ children }) => {
  return (
    <div className="app-page">
      <Header />
      <main className="app-container">
        {children}
      </main>
    </div>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CommonLayout;
