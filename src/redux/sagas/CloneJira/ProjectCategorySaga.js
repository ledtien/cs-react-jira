import { call } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../contants/CloneJira/Jira";

function* getAllProjectCategory(action) {
  try {
    const { data, status } = yield call(() =>
      jiraService.getAllProjectCategory()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_PROJECT_CATEGORY, data });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* listenAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory);
}
