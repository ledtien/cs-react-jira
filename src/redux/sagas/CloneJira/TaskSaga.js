import { takeLatest } from "redux-saga/effects";
import { select } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { showNotification } from "../../../util/Notifications/notificationJira";
import {
  CLOSE_DRAWER,
  GET_PROJECT_DETAIL_SAGA,
} from "../../contants/CloneJira/Jira";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  CREATE_TASK,
  CREATE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_TASK_STATUS_SAGA,
} from "../../contants/CloneJira/TaskConstant";

function* createTaskSaga(action) {
  try {
    const { data, status } = yield call(() => {
      return taskService.createTask(action.taskObject);
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      //   yield put({ type: CREATE_TASK, arrTaskType: data.content });
      yield put({ type: GET_PROJECT_DETAIL_SAGA });
      yield put({ type: CLOSE_DRAWER });
      showNotification("success", "Task is created");
    }
  } catch (err) {
    console.log(err.response.data);
    showNotification("error", "Task failed!");
  }
}

export function* listenCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

//get task detail
function* getTaskDetailSaga(action) {
  try {
    const { data, status } = yield call(() => {
      return taskService.getTaskDetail(action.taskId);
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      //   yield put({ type: CREATE_TASK, arrTaskType: data.content });
      yield put({ type: GET_TASK_DETAIL, taskDetail: data.content });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* listenGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

//update task
function* updateTaskStatus(action) {
  try {
    const { data, status } = yield call(() => {
      return taskService.updateStatusTask(action.updateStatus);
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.updateStatus.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.updateStatus.taskId,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* listenUpdateTaskStatus() {
  yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatus);
}

//handlechangepostAPI

function* handleChangePostAPI(action) {
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      {
        const { value, name } = action;
        yield put({ type: CHANGE_TASK_MODAL, name, value });
      }
      break;

    case REMOVE_USER_ASSIGN:
      {
        const { userId } = action;
        yield put({ type: REMOVE_USER_ASSIGN, userId });
      }
      break;

    case CHANGE_ASSIGNESS:
      {
        const { userSelected } = action;
        yield put({ type: CHANGE_ASSIGNESS, userSelected });
      }
      break;
    default:
      return;
  }

  const { taskDetail } = yield select((state) => state.TaskDetailReducer);
  const listUserAsign = taskDetail.assigness?.map((user, index) => {
    return user.id;
  });
  const taskUpdateAPI = { ...taskDetail, listUserAsign };

  try {
    const { data, status } = yield call(() => {
      return taskService.updateTask(taskUpdateAPI);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskDetail.projectId,
      });
      yield put({ type: GET_TASK_DETAIL_SAGA, taskId: taskDetail.taskId });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* listenHandleChangePostAPI() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostAPI);
}
