import { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/RootStoreContext';

const ProtectedRoute = observer(({ children, to }) => {
  const { userStore } = useStore();
  const { user } = userStore;

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (to === '/' && user) navigate(to);
    if (to === '/login' && !user) navigate(to);
  }, [navigate, user, to]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
});

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.oneOf(['/', '/login']).isRequired,
};
