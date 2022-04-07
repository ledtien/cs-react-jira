import axios from "axios";
import { DOMAIN_CLONE_JIRA, TOKEN_JIRA } from "../util/constants/settingSystem";

export const jiraService = {
  signInJira: (userLogin) => {
    return axios({
      url: `${DOMAIN_CLONE_JIRA}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },

  getAllProjectCategory: () => {
    return axios({
      url: `${DOMAIN_CLONE_JIRA}/ProjectCategory`,
      method: "GET",
    });
  },

  createProject: (newProject) => {
    return axios({
      url: `${DOMAIN_CLONE_JIRA}/Project/createProject`,
      method: "POST",
      data: newProject,
    });
  },
  createProjectAuthorization: (newProject) => {
    return axios({
      url: `${DOMAIN_CLONE_JIRA}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN_JIRA) }, //JWT
    });
  },
};
