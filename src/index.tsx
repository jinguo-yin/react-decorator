import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import YAML from 'yaml';

import { componentInit } from './decorator/componentInit';
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
  //如何从前端访问服务器上的文件
  const path =  window.location.origin;   //使用origin，不要使用href，避免在路由中出现错误

  const res = await fetch(path + '/config.yaml', {headers: {'Accept': 'application/text'}});
  const text = await res.text();
  
  const data = YAML.parse(text);
  console.log('data is: ', data);

  await componentInit(
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