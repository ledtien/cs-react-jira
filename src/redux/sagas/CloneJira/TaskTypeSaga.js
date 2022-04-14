import { takeLatest } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import { taskTypeService } from "../../../services/TaskTypeService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../contants/CloneJira/TaskTypeConstant";

function* getAllTaskType() {
  try {
    const { data, status } = yield call(() => {
      return taskTypeService.getAllTaskType();
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_TASK_TYPE, arrTaskType: data.content });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* listenGetAllTaskType() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskType);
}
