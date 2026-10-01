import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import AppRoutes from './routes';
import { JogoProvider } from './contexto/Jogo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <JogoProvider>
        <AppRoutes />
      </JogoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
