import registerServiceWorker from "./registerServiceWorker";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import { composeWithDevTools } from 'redux-devtools-extension';
import tasksReducer from './reducers';
import logger from './middleware/logger';
import analytics from './middleware/analytics';

const rootReducer = (state = {}, action) => {
    return {
        tasks: tasksReducer(state.tasks, action),
    };
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger, analytics)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();