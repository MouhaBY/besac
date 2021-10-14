import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { UserDataProvider } from './utils/context';


ReactDOM.render(
  <React.StrictMode>
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);