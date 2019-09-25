import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import reducers from './reducer'
import './config'
import App from './App'
import './style.less'
import 'antd/dist/antd.css';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtenion ? window.devToolsExtenion() : f=> f
))

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
        <App></App>
        </BrowserRouter>
    </Provider>
),document.getElementById('root'));

