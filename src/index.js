import React from 'react';
import ReactDOM from 'react-dom';
import { Router, withRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'react-popper';
import 'font-awesome/css/font-awesome.min.css';
import './styles/index.scss';
import history from './history';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import { loadAllProducts } from './actions/products-action';
// import { createLogger } from 'redux-logger';

import Auth from './AuthService/Auth';

const middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  // middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));
Auth.checkAndInitializeLoginStatus(store.dispatch);
store.dispatch(loadAllProducts());
const AppCom = withRouter(App);
const app = (
  <Router history={history}>
    <AppCom />
  </Router>
);
ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));
registerServiceWorker();
