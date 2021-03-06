import { ACTIONS } from '../actions/types';
const processOrder = order => {
  let total = 0;
  order.items.forEach(item => {
    item.qty = parseInt(item.qty, 10);
    item.price = parseFloat(item.price);
    total += item.qty;
  });
  order.id = order._id;
  order.totalQty = total;
  order.createdAt = new Date(order.createdAt);
  return order;
};
export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.ORDERS_ALL_LOADED: {
      return action.loadedOrders.reduce((allOrders, order) => {
        allOrders[order._id] = processOrder(order);
        return allOrders;
      }, {});
    }
    case ACTIONS.CHECKOUT_SUCCESS: {
      return {
        ...state,
        [action.lastSuccessfulOrder._id]: processOrder(action.lastSuccessfulOrder)
      };
    }
    default:
      return state;
  }
};
