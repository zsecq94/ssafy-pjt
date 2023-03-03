import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/configStore";
import {PersistGate} from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
// antd 적용
// import 'antd/dist/antd.css';

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();