import { USER_LOGIN } from "../../util/constants/settingSystem";
import { GET_USER_SEARCH, USER_SIGNIN_JIRA } from "../contants/CloneJira/Jira";
import { GET_USER_BY_PROJECT } from "../contants/CloneJira/UserConstant";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: usLogin,
  userSearch: [],
  arrUser: [],
};

export const UserJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_JIRA: {
      state.userLogin = action.userLogin;
      return { ...state };
    }

    case GET_USER_SEARCH: {
      state.userSearch = action.listUserSearch;
      return { ...state };
    }

    case GET_USER_BY_PROJECT: {
      return { ...state, arrUser: action.arrUser };
    }
    default:
      return { ...state };
  }
};
