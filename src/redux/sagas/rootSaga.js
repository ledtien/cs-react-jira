import { all } from "redux-saga/effects";
import * as Jira from "../sagas/CloneJira/CloneJiraSaga";
import * as ProjectCategorySaga from "../sagas/CloneJira/ProjectCategorySaga";
import * as ProjectSaga from "../sagas/CloneJira/ProjectSaga";

export function* rootSaga() {
  yield all([
    Jira.listenSignin(),
    ProjectCategorySaga.listenAllProjectCategory(),
    ProjectSaga.listenCreateProjectSaga(),
  ]);
}
