import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import './index.css';
import AppRoutes from './routes';
import { JogoProvider } from './contexto/Jogo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <JogoProvider>
        <AppRoutes />
        <Analytics />
      </JogoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
