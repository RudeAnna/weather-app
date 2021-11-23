import { LOGIN_USER, LOGOUT_USER } from "./authTypes";

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
