import { ACTIONS } from '../actions/types';

export default (state = { message: '', type: '' }, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_ALERT: {
      return {
        message: action.message,
        type: action.messageType
      };
    }
    case ACTIONS.CLOSE_ALERT: {
      return {
        message: '',
        type: ''
      };
    }
    case ACTIONS.INITIALIZING: {
      return {
        message: '',
        type: 'INITIALIZING'
      };
    }
    default:
      return state;
  }
};
