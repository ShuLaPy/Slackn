import * as actionTypes from "../constants/actionTypes";

export const setUser = (user: any) => ({
  type: actionTypes.SET_USER,
  payload: {
    currentUser: user,
  },
});
