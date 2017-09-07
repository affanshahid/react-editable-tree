import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import './index.css';
import { App } from './containers';
import './extensions';
import { createMockData } from './utils';

let store = createStore(reducer, createMockData(5));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

window.addEventListener('keydown', function (ev) {
    if (window.navigator.platform.includes('Mac'))
        window.controlPressed = ev.altKey;
    else
        window.controlPressed = ev.ctrlKey;
});

window.addEventListener('keyup', function (ev) {
    if (window.navigator.platform.includes('Mac'))
        window.controlPressed = ev.altKey;
    else
        window.controlPressed = ev.ctrlKey;
});