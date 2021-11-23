import { LOGIN_USER, LOGOUT_USER } from "./authTypes";

const initialState = {
  currentUser: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem("user", action.payload);
      return {
        currentUser: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      localStorage.clear();
      return {
        currentUser: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
export default authReducer;

