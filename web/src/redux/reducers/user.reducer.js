const initialState = {
  users: [{ name: "bob" }],
  isLoggedIn: false
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: action.data || []
      };
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true
      };
    default:
      return { ...state };
  }
};
