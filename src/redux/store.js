import { createStore } from "redux";

import myReducer from "./reducers/level-progress";

export default function configureStore(initialState) {
  const store = createStore(
    myReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
