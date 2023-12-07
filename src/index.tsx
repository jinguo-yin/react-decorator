import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBase } from './decorator/createbase';
import { Home } from './home';
import Second from './second';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const render = () => {
  root.render(
      <App />
  )
};

reportWebVitals();

async function bootstrap()
{
  await createBase(
    {
      controllers: [
        Home,
        Second
      ]
    }
  )
  
  render();
}
bootstrap();