import registerServiceWorker from "./registerServiceWorker";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import tasks from './reducers';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(tasks, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();