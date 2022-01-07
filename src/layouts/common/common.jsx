import PropTypes from 'prop-types';
import Header from '~/components/header/header';

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container-xl px-0">
        {children}
      </main>
    </>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CommonLayout;
