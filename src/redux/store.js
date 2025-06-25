import { createStore } from "redux";
import rootReducer from "./reducers";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => createStore(rootReducer);

export const wrapper = createWrapper(makeStore);
