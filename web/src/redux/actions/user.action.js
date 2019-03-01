import Service from "./service";

export const getUsers = () => dispatch => {
  Service.dispatchGet(dispatch, "user", {
    init: "GET_USERS",
    success: "GET_USERS_SUCCESS",
    error: "GET_USERS_FAILED"
  });
};

export const login = () => dispatch => {
  dispatch({ type: "LOGIN" });
};
