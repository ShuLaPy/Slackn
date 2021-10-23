import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { ChannelReducer, UserReducer } from "./reducers/reducer";

const rootReducer = combineReducers({
  user: UserReducer,
  channel: ChannelReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export { store };
