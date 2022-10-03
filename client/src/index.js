import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

import {Auth0Provider} from '@auth0/auth0-react';

import {CityProvider} from "./components/CityContext"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
  <Auth0Provider
    domain="dev-fn7jse-u.us.auth0.com"
    clientId="38NS3bA0kGNNSsf8kiqLARIzCh2Z3P93"
    redirectUri={window.location.origin}
  >
    <CityProvider>
      <App />
    </CityProvider>
  </Auth0Provider>
</React.StrictMode>
);


