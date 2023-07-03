import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { Navigate, useParams } from 'react-router-dom';
import { useStore } from '../../contexts/RootStoreContext';

// Ограничивает динамический маршрут с :userId до одного юзера

const ProtectedUser = observer(({ children }) => {
  const { userStore } = useStore();
  const { user } = userStore;

  const { userId } = useParams();

  if (user && userId !== undefined && userId !== String(user.id)) {
    return <Navigate to="/404" replace />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
});

export default ProtectedUser;

ProtectedUser.propTypes = {
  children: PropTypes.node,
};
