import { applyMiddleware, combineReducers, createStore } from "redux";
import { todoListReducer } from "./todoListReducer";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "../sagas/rootSaga";
import { loadingReducer } from "./LoadingReducer";
import { HistoryReducer } from "./HistoryReducer";
import { UserJiraReducer } from "./UserJiraReducer";
import { ProjectCategoryJiraReducer } from "./ProjectCategoryJiraReducer";
import { ProjectJiraReducer } from "./ProjectJiraReducer";
import { DrawerJiraReducer } from "./DrawerJiraReducer";
import { FormProjectReducer } from "./FormProjectReducer";
import { TaskTypeReducer } from "./TaskTypeReducer";
import { PriorityReducer } from "./PriorityReducer";
import { StatusReducer } from "./StatusReducer";
import { TaskDetailReducer } from "./TaskDetailReducer";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  //createstore
  todoListReducer,
  loadingReducer,
  HistoryReducer,
  UserJiraReducer,
  ProjectCategoryJiraReducer,
  ProjectJiraReducer,
  DrawerJiraReducer,
  FormProjectReducer,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  TaskDetailReducer,
});
const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
// gan middleware moi run saga
middleWareSaga.run(rootSaga);

export default store;
