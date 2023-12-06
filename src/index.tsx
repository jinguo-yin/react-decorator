import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import axios from 'axios';
import { createBase } from './decorator/createbase';
import { Home } from './home';
import Second from './second';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const render = () => {
  root.render(
    // <React.StrictMode>
      <App />
    // </React.StrictMode>
  )
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
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