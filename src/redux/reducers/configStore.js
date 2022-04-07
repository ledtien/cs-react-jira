import { applyMiddleware, combineReducers, createStore } from "redux";
import { todoListReducer } from "./todoListReducer";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "../sagas/rootSaga";
import { loadingReducer } from "./LoadingReducer";
import { HistoryReducer } from "./HistoryReducer";
import { UserJiraReducer } from "./UserJiraReducer";
import { ProjectCategoryJiraReducer } from "./ProjectCategoryJiraReducer";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  //createstore
  todoListReducer,
  loadingReducer,
  HistoryReducer,
  UserJiraReducer,
  ProjectCategoryJiraReducer,
});
const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
// gan middleware moi run saga
middleWareSaga.run(rootSaga);

export default store;
