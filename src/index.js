import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from './Routing';
import ItemState from './context/ItemState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ItemState>
    <Routing />
  </ItemState>
);