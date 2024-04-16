import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import YAML from 'yaml';

import { componentInit } from './decorator/componentInit';
import { Home } from './home';
import Second from './second';
import EmApp from './EmApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const render = () => {
  root.render(
      <App />
      // <EmApp />
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

  //   //Load module from string in react

  //   const dync = await fetch(path + '/dync.js',  {headers: {'Accept': 'application/text'}});
  //   const dyncJs = await dync.text();
  //   // eslint-disable-next-line no-eval
  //   const str = `
  //   const {jsstr, require} = env;
  //   console.log('start');
  //   moduleExports = await require('http://localhost:8800/dync.js');
  //   console.log('moduleExports', moduleExports);
  //   return moduleExports
  // `;

  //   const file = new Blob([dyncJs], { type: 'application/javascript' });
  //   // const url = URL.createObjectURL(file);
  //   // eslint-disable-next-line no-new-func
  //   const fun = new Function('env', str);
  //   const reuslt = await fun({jsstr: file, require: require});

  //   console.log('result: ', reuslt);


    
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

await bootstrap();