import React, { ReactNode, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { compMap, baseController } from './decorator/componentInit';
import { CLASS_HANDLE } from './decorator/decorator';

export interface RouteItem {
  title: string;
  path: string;
  entity: ReactNode;
}

export interface DataItem {
  scope: string;
  title: string;
  decorator: string;
  path: string;
  props?: string;
}

function App() {
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  useEffect(() => {
    axios('/mock/menus').then(res => {
      const items: DataItem[] = res.data.data;;
      let temp: RouteItem[] = [];
      items.forEach(it => {
        const entities = compMap.filter(comp=> comp.decorator === it.decorator);
        if(entities.length > 0) {
          const id = baseController.findIndex(controller => controller.scope === it.scope);
          const funcName = entities[0].funcName;

          let entity = null;
          if(it.props) {
            entity = baseController[id].controller[funcName].apply(baseController[id].controller, [...it.props]);
          }else {
            entity = baseController[id].controller[funcName].apply(baseController[id].controller);
          }

          temp.push({title: it.title, path: it.path, entity:entity});
        }
      })
      
      setRoutes(temp);
    });
  
  }, [setRoutes]);

  if(routes.length === 0) return null;
  
  const handleClick = async () => {
        // const str = " var moduleExports = import('http://localhost:8800/test.js');  console.log('moduleExports', moduleExports); return moduleExports";
        // // eslint-disable-next-line no-new-func
        // const fun = new Function('env', str);
        //  await fun({jsstr: 'dync.js', require: require});
        // // eslint-disable-next-line no-eval
        // const result =  await eval("import('http://localhost:8800/test.js')");
        // const resultString = Object.prototype.toString.call(result);
        // console.log('result: ', result, resultString);
        // const test = await import('./dync');
        
        // console.log('test', test);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <button onClick={handleClick}>测试</button>
        {
          routes.map((it, idx) =>{
            return (
              <div key = {idx}>
                <Link key = {it.title} to = {it.path}>{it.title}</Link>
              </div>
            )
          })
        }
      </div>
        <Routes>
          {
            routes.map((it, idx) => {
              return(
                <Route key = {idx} path = {it.path} element = {it.entity} />
              )
            })
          }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
