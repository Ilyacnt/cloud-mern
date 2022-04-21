import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './reducers';
import { Provider } from 'react-redux';
import './styles/index.scss';
import Layout from './Layout';
import ThemeProvider from './components/theme/ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
