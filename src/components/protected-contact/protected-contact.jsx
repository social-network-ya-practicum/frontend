import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../contexts/RootStoreContext';

// Ограничивает динамические маршруты с :contactId только существующими контактами

const ProtectedContact = observer(({ children }) => {
  const { errorStore } = useStore();
  const { isContactExist } = errorStore;

  if (!isContactExist) {
    return <Navigate to="/404" replace />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
});

export default ProtectedContact;

ProtectedContact.propTypes = {
  children: PropTypes.node,
};
