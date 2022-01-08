import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuth } from '~/modules/user';

const PrivateRoute = ({
  element,
  redirectURL,
}) => {
  const isAuth = useSelector(getIsAuth);

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
