import { takeLatest } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import { priorityService } from "../../../services/PriorityService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
} from "../../contants/CloneJira/PriorityConstant";

function* getAllPriority() {
  try {
    const { data, status } = yield call(() => {
      return priorityService.getAllPriority();
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_PRIORITY, arrPriority: data.content });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* listenGetAllPriority() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPriority);
}
