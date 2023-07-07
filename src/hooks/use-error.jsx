import { useCallback, useState } from 'react';
import { useStore } from '../contexts/RootStoreContext';
import { generateId } from '../utils/utils';

const useError = () => {
  const { errorStore } = useStore();
  const { addError, deleteError } = errorStore;
  const [errorId, setErrorId] = useState('');

  const setError = useCallback(
    (message, { isPrivate = false } = {}) => {
      const id = generateId();
      setErrorId(id);
      addError({ id, message, isPrivate });
    },
    [addError]
  );

  const clearError = useCallback(() => {
    deleteError(errorId);
    setErrorId('');
  }, [deleteError, errorId]);

  return { setError, clearError };
};

export default useError;
