import * as UserConstants from "../constants/actionTypes";

export interface NotesState {
  usersData: any;
  loading: boolean;
  error: boolean;
}

const instialState = {
  usersData: {},
  loading: false,
  error: false,
};

export type Action = { type: "FETCH_USER"; payload: string };

export const UserReducer = (
  state: NotesState = instialState,
  action: Action
) => {
  switch (action.type) {
    case UserConstants.FETCH_USER:
      return { ...state, loading: true };
    default:
      return state;
  }
};
