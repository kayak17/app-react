import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useRouterNavigate = () => {
  const navigate = useNavigate();

  const handleRedirectToRoute = useCallback((route) => {
    navigate(route);
  }, [navigate]);

  return handleRedirectToRoute;
};

export default useRouterNavigate;
