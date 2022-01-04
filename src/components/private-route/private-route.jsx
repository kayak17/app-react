import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({
  element,
  redirectURL,
}) => {
  const isAuth = true; // useAuth();

  return (
    isAuth ? (
      <>{element}</>
    ) : (
      <Navigate to={redirectURL} replace />
    )
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  redirectURL: PropTypes.string.isRequired,
};

export default PrivateRoute;
