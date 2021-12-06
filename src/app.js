import React from "react";
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import { Data } from './views/Singers/data';

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
          {renderRoutes(routes)}
        </Data>
      </HashRouter>
    </Provider>
  );
}

