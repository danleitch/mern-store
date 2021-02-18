import * as actionTypes from "../constants/loginConstants";

const USER_INITIAL_STATE = {
  userEmail: '',
};

export const loginReducer = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      const user = action.payload;

      const userEmail = user && user.email;

      if (userEmail) {
        return {
          ...state,
          userEmail,
        };
      } else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
};
