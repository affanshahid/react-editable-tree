import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import nodeList from './reducer';
import './index.css';
import App from './App';
import './extensions';

let store = createStore(nodeList);

ReactDOM.render(<div><Provider store={store}><App /></Provider></div>, document.getElementById('root'));

