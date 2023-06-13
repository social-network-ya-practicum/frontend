import { useContext, createContext } from 'react';

export const RootStoreContext = createContext(null);

export const useStore = () => useContext(RootStoreContext);
