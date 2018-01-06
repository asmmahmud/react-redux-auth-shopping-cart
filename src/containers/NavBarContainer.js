import { connect } from 'react-redux';
import { getCartItemCount } from '../reducers/cartReducer';
import NavigationBar from '../components/NavigationBar';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    cartItemCount: getCartItemCount(state),
    profilePic: state.userProfile.picture
  };
};
export default connect(mapStateToProps)(NavigationBar);
