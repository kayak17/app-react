import PropTypes from 'prop-types';
import HeaderWrapper from '~/components/header/wrapper/wrapper';

const CommonLayout = ({ children }) => {
  return (
    <>
      <HeaderWrapper />
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
