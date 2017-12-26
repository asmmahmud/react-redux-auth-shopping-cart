import { connect } from 'react-redux';
import Alert from '../components/Alert';
import {closeTheAlert} from '../actions/alert';

const mapStateToProps = state => {
  return {
    message: state.alert.message,
    type: state.alert.type
  };
};

export default connect(mapStateToProps, { closeTheAlert })(Alert);
