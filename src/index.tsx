import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from './store/store';

interface State {
  store: Store;
}

const store = new Store();

export const Contex = createContext<State>({
  store,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Contex.Provider value={{ store }}>
    <App />
  </Contex.Provider>,
);
