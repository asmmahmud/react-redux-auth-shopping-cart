import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { FadeCSSTransitionWrapper } from './AnimatedWrappers';
import Alert from './components/Alert';
import NavigationBar from './components/NavigationBar';
import CallBack from './components/CallBack';
import NewProduct from './components/products/NewProduct';
import Products from './components/Products';
import Orders from './components/Orders';
import OrderDetail from './components/Orders/OrderDetail';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';
import SideMenu from './components/sidebar/SideMenu';
import MiniCart from './components/sidebar/MiniCart';
import './styles/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      isOpen: false,
      isDropDownOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleDropdown(e) {
    e.preventDefault();
    if (e.target.id === 'navbarDropdownMenuLink') {
      this.setState({
        isDropDownOpen: !this.state.isDropDownOpen
      });
    } else if (this.state.isDropDownOpen) {
      this.setState({
        isDropDownOpen: false
      });
    }
  }
  render() {
    return (
      <div className="page" onClick={this.toggleDropdown}>
        <NavigationBar
          {...this.props}
          toggle={this.toggle}
          isOpen={this.state.isOpen}
          isDropDownOpen={this.state.isDropDownOpen}
        />
        <div className="container-fluid">
          <Alert />
          <div className="row">
            <div className="col-md-3 sidebar">
              <MiniCart />
              <SideMenu />
            </div>
            <TransitionGroup className="col-md-9 main-content">
              <Switch>
                <Route path="/callback" component={CallBack} />
                <Route path="/home" component={Products} />
                <Route path="/products/new" component={NewProduct} />
                <Route path="/products" exact component={Products} />
                <Route
                  path="/orders/:orderId"
                  render={props => {
                    const Temp = FadeCSSTransitionWrapper(OrderDetail);
                    return <Temp {...props} />;
                  }}
                />
                <Route
                  path="/order-success/:orderId"
                  render={props => {
                    const Temp = FadeCSSTransitionWrapper(OrderDetail);
                    return <Temp {...props} />;
                  }}
                />
                <Route path="/orders" exact component={Orders} />
                <Route path="/cart/checkout" component={Checkout} />
                <Route path="/category/:categoryName" exact component={Products} />
                <Redirect exact from="/" to="/products" />
                <Route component={NotFound} />
              </Switch>
            </TransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
