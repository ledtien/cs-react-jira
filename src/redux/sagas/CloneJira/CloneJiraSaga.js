import axios from "axios";
import { select } from "redux-saga/effects";
import { call, delay } from "redux-saga/effects";
import { put, takeLatest } from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { TOKEN_JIRA, USER_LOGIN } from "../../../util/constants/settingSystem";
import {
  USER_SIGNIN_JIRA,
  USER_SIGN_IN_API,
} from "../../contants/CloneJira/Jira";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../contants/Loading";

function* signinSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(500);
    // goi api
    const { data } = yield call(() => {
      return jiraService.signInJira(action.userLogin);
    });
    localStorage.setItem(TOKEN_JIRA, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({ type: USER_SIGNIN_JIRA, userLogin: data.content });

    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/");
  } catch (err) {
    console.log("Error", err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* listenSignin() {
  yield takeLatest(USER_SIGN_IN_API, signinSaga);
}
