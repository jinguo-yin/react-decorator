import React, { ReactNode, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { compMap, baseController } from './decorator/createbase';


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
  entity: string;
  props?: string;
}

function App() {
  const [routes, setRoutes] = useState<RouteItem[]>([]);

  useEffect(() => {
    axios('/mock/menus').then(res => {
      const items: DataItem[] = res.data.data;;

      let temp: RouteItem[] = [];
      items.forEach(it => {
        const entities = compMap.filter(comp=> comp.name === it.decorator);
        if(entities.length > 0) {
          if(it.props) {
            const id = baseController.findIndex(controller => controller.scope === it.scope);
            const entity = baseController[id].conroller[it.decorator].apply(baseController[id].conroller, [...it.props]);
            temp.push({title: it.title, path: it.path, entity:entity});
          }else {
            const id = baseController.findIndex(controller => controller.scope === it.scope);
            const entity = baseController[id].conroller[it.entity].apply(baseController[id].conroller);
            temp.push({title: it.title, path: it.path, entity:entity});
          }
        }
      })
      
      setRoutes(temp);

    }).catch((err: any) => {
      throw Error(err);
    });
  
  }, []);

  if(routes.length === 0) return null;
  
  return (
    <BrowserRouter>
      <div className="App">
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
