import { authActions } from "../index";
import { Auth } from "../reducers/auth";

export const logOut = () => {
  localStorage.removeItem("auth");
  return async (dispatch: any) => {
    await dispatch(authActions.logout());
  };
};

export const authenticate = (auth: Auth) => {
  //   localStorage.setItem("auth", JSON.stringify(auth));

  return async (dispatch: any) => {
    await dispatch(authActions.authenticate(auth));
  };
};
