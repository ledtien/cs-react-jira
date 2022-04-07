import { USER_SIGN_IN_API } from "../contants/CloneJira/Jira";

export const jiraSignInAction = (email, password) => {
  return {
    type: USER_SIGN_IN_API,
    userLogin: { email: email, password: password },
  };
};
