import { all } from "redux-saga/effects";
import * as Jira from "../sagas/CloneJira/CloneJiraSaga";
import * as ProjectCategorySaga from "../sagas/CloneJira/ProjectCategorySaga";
import * as ProjectSaga from "../sagas/CloneJira/ProjectSaga";
import * as TaskTypeSaga from "../sagas/CloneJira/TaskTypeSaga";
import * as PrioritySaga from "../sagas/CloneJira/PrioritySaga";
import * as TaskSaga from "../sagas/CloneJira/TaskSaga";
import * as StatusSaga from "../sagas/CloneJira/StatusSaga";

export function* rootSaga() {
  yield all([
    Jira.listenSignin(),
    ProjectCategorySaga.listenAllProjectCategory(),
    ProjectSaga.listenCreateProjectSaga(),
    ProjectSaga.listenGetAllProjects(),
    ProjectSaga.listenUpdateProject(),
    ProjectSaga.listenDeleteProject(),
    ProjectSaga.listenGetUsers(),
    ProjectSaga.listenAddUserProject(),
    ProjectSaga.listenDeleteUserProject(),
    ProjectSaga.listenGetProjectDetail(),
    ProjectSaga.listenGetAllProjectSaga(),
    ProjectSaga.listenGetUserByProject(),

    TaskTypeSaga.listenGetAllTaskType(),
    PrioritySaga.listenGetAllPriority(),
    TaskSaga.listenCreateTaskSaga(),
    TaskSaga.listenGetTaskDetailSaga(),
    TaskSaga.listenUpdateTaskStatus(),
    TaskSaga.listenHandleChangePostAPI(),
    StatusSaga.listenGetAllStatus(),
  ]);
}
