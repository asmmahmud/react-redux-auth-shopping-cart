const ACTIONS = {
  STORE_USER_PROFILE: 'store_user_profile',
  LOGIN_STATUS_CHANGED: 'login_status_changed',

  WORK_IN_PROGRESS: 'work_in_progress',
  SHOW_ALERT: 'show_alert',
  CLOSE_ALERT: 'close_alert',

  ADD_TO_CART: 'add_to_cart',
  SUBTRACT_FROM_CART: 'subtract_form_cart',
  REMOVE_FROM_CART: 'remove_item_form_cart',
  USER_CART_LOADED: 'user_cart_loaded',
  CART_CLEARING: 'cart_clearing',
  CART_UPDATING_START: 'cart_updating_start',
  CART_UPDATING_END: 'cart_updating_end',
  CART_UPDATING_FAILED: 'cart_updating_failed',

  NEW_PRODUCT_SUBMITTING: 'new_product_submitting',
  NEW_PRODUCT_SUCCESS: 'new_product_success',
  NEW_PRODUCT_FAILED: 'new_product_failed',

  PRODUCTS_LOADING_START: 'products_loading_start',
  PRODUCTS_ALL_LOADED: 'all_product_loaded',
  PRODUCTS_LOADING_FAILED: 'products_loading_end',

  CHECKOUT_STARTED: 'checkout_started',
  CHECKOUT_SUCCESS: 'checkout_success',
  CHECKOUT_FAILED: 'checkout_failed',

  ORDERS_LOADING_START: 'orders_loading_start',
  ORDERS_ALL_LOADED: 'all_order_loaded',
  ORDERS_LOADING_FAILED: 'orders_loading_end'
};

export { ACTIONS };
