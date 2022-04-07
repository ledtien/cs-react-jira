import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USER_SIGNIN_JIRA } from "../contants/CloneJira/Jira";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: usLogin,
};

export const UserJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_JIRA: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
