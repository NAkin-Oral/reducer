import { createContext, useReducer } from 'react';

export const Store = createContext();

export const initialState = {
  episodes: [],
  favourites: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, episodes: action.payload };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
