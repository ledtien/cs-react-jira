import { call, select } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";
import {
  deleteProjectService,
  jiraService,
  projectDetailService,
  projectJiraService,
} from "../../../services/JiraService";
import { userService } from "../../../services/UserService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { showNotification } from "../../../util/Notifications/notificationJira";
import {
  ADD_USER_PROJECT_SAGA,
  CLOSE_DRAWER,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  DELETE_USER_FROM_PROJECT_SAGA,
  GET_ALL_PROJECTS,
  GET_ALL_PROJECTS_SAGA,
  GET_ALL_PROJECTS_SAGA_LIST,
  GET_ALL_PROJECT_ACTION,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  GET_USER_SAGA,
  GET_USER_SEARCH,
  UPDATE_PROJECT_SAGA,
} from "../../contants/CloneJira/Jira";
import {
  GET_USER_BY_PROJECT_SAGA,
  GET_USER_BY_PROJECT,
} from "../../contants/CloneJira/UserConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../contants/Loading";

function* createProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { status } = yield call(() =>
      jiraService.createProjectAuthorization(action.newProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      let history = yield select((state) => state.HistoryReducer.history);
      history.push("/");
    }
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* listenCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

//call api get all project
function* getAllProject() {
  try {
    const { data, status } = yield call(() => {
      return jiraService.getAllProjects();
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_PROJECTS, projectList: data.content });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* listenGetAllProjects() {
  yield takeLatest(GET_ALL_PROJECTS_SAGA, getAllProject);
}

//update project

function* updateProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { status } = yield call(() => {
      return jiraService.updateProject(action.projectUpdate);
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
    }
    yield put({ type: GET_ALL_PROJECTS_SAGA });
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* listenUpdateProject() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProject);
}

//delete project

function* deleteProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { status } = yield call(() => {
      return deleteProjectService.deleteProject(action.projectId);
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      showNotification("success", "Delete project is completed");
    } else {
      showNotification("warning", "Delete project is uncompleted");
    }
    yield put({ type: GET_ALL_PROJECTS_SAGA });
    yield put({ type: CLOSE_DRAWER });
  } catch (err) {
    showNotification("error", "Delete project fail!");
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* listenDeleteProject() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProject);
}

//get users saga

function* getUsers(action) {
  try {
    const { data, status } = yield call(() => {
      return userService.getUser(action.keyWord);
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_USER_SEARCH, listUserSearch: data.content });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* listenGetUsers() {
  yield takeLatest(GET_USER_SAGA, getUsers);
}

//add user project saga

function* addUserProject(action) {
  try {
    const { status } = yield call(() => {
      return userService.assignUserProject(action.userProject);
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_PROJECTS_SAGA });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* listenAddUserProject() {
  yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProject);
}

// get user by project saga
function* getUserByProjectSaga(action) {
  try {
    const { data, status } = yield call(() => {
      return userService.getUserByProjectId(action.projectId);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_USER_BY_PROJECT, arrUser: data.content });
    }
  } catch (err) {
    console.log(err.response.data);
    if (err.response.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({ type: GET_USER_BY_PROJECT, arrUser: [] });
    }
  }
}

export function* listenGetUserByProject() {
  yield takeLatest(GET_USER_BY_PROJECT_SAGA, getUserByProjectSaga);
}

//remove user project saga

function* deleteUserProject(action) {
  try {
    const { status } = yield call(() => {
      return userService.deleteUserFormProject(action.userProject);
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_PROJECTS_SAGA });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* listenDeleteUserProject() {
  yield takeLatest(DELETE_USER_FROM_PROJECT_SAGA, deleteUserProject);
}

//get project detail

function* getProjectDetail(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() => {
      return projectDetailService.getProjectDetail(action.projectId);
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_PROJECT_DETAIL, projectDetail: data.content });
    }
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* listenGetProjectDetail() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetail);
}

//get all project

function* getAllProjectSaga() {
  try {
    const { data, status } = yield call(() => {
      return projectJiraService.getAllProject();
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_PROJECT_ACTION, arrProject: data.content });
      yield put({
        type: GET_USER_BY_PROJECT_SAGA,
        projectId: data.content[0].id,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* listenGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECTS_SAGA_LIST, getAllProjectSaga);
}
