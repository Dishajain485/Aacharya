// App Context - STRICT IMPLEMENTATION
import { createContext, useContext, useReducer, useEffect } from 'react';
import { appReducer, initialState } from './appReducer';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load state from localStorage
  const loadState = () => {
    try {
      const savedState = localStorage.getItem('aacharyaState');
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(appReducer, initialState, loadState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('aacharyaState', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
