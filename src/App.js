import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AlertContainer from './containers/AlertContainer';

import NavigationBar from './containers/NavBar';
// import Home from './components/Home';
import CallBack from './containers/CallBack';
import CartContainer from './containers/CartContainer';
import NewProductContainer from './containers/ProductContainer/NewContainer';
import ProductContainer from './containers/ProductContainer';
import OrdersContainer from './containers/OrdersContainer';
import OrderDetailContainer from './containers/OrdersContainer/OrderDetailContainer';
import Sidebar from './components/Sidebar';
import './css/App.css';

class App extends React.Component {
  render () {
    return (
      <div id='page'>
        <NavigationBar />
        <AlertContainer />
        <div className='container'>
          <div className="row">
            <div className="col-sm-2">
                <Sidebar/>
            </div>
            <div className="col-sm-10">
              <Switch>
                <Route path='/callback' component={CallBack} />
                <Route path='/home' title="React Shopping Cart" component={ProductContainer} />
                <Route path='/products' title="React Shopping Cart - Products" exact component={ProductContainer} />
                <Route path='/products/new' title="React Shopping Cart - Add New Product" component={NewProductContainer} />
                <Route path='/cart' component={CartContainer} />
                <Route path='/orders' title="React Shopping Cart - All Orders" component={OrdersContainer} />
                <Route
                  path='/order-success/:orderId'
                  component={OrderDetailContainer}
                />
                <Route path='/:categoryName' component={ProductContainer} />
                <Redirect exact from='/' to='/products' />
              </Switch>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
