import { takeLatest } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import { statusService } from "../../../services/StatusService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_STATUS_SAGA,
  GET_ALL_STATUS,
} from "../../contants/CloneJira/StatusConstant";

function* getAllStatus() {
  try {
    const { data, status } = yield call(() => {
      return statusService.getAllStatus();
    });
    //goi action sau khi lay api thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_STATUS, arrStatus: data.content });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* listenGetAllStatus() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatus);
}
