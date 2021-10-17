import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { UserReducer } from "./reducers/reducer";

const rootReducer = combineReducers({
  user: UserReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export { store };
