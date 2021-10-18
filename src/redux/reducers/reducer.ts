import * as actionTypes from "../constants/actionTypes";

export interface UserState {
  currentUser: any;
  loading: boolean;
  error: boolean;
}

const instialState = {
  currentUser: null,
  loading: true,
  error: false,
};

export const UserReducer = (state: UserState = instialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        loading: false,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        loading: false,
      };
    default:
      return state;
  }
};
