import { takeLatest } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { showNotification } from "../../../util/Notifications/notificationJira";
import { CLOSE_DRAWER } from "../../contants/CloneJira/Jira";
import {
  CREATE_TASK,
  CREATE_TASK_SAGA,
} from "../../contants/CloneJira/TaskConstant";

function* createTaskSaga(action) {
  try {
    const { data, status } = yield call(() => {
      return taskService.createTask(action.taskObject);
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      //   yield put({ type: CREATE_TASK, arrTaskType: data.content });
      console.log(data);
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
