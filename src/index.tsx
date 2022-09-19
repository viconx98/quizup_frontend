import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import mainStore from './mainStore';
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

console.log(process.env.REACT_APP_URL)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={mainStore}>
      <App />
    </Provider>
  </BrowserRouter>
);
