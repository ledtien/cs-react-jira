import axios from "axios";
import { DOMAIN_CLONE_JIRA, TOKEN_JIRA } from "../util/constants/settingSystem";

export class baseService {
  put = (url, model) => {
    return axios({
      url: `${DOMAIN_CLONE_JIRA}/${url}`,
      method: "PUT",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN_JIRA) }, //JWT
    });
  };
  post = (url, model) => {
    return axios({
      url: `${DOMAIN_CLONE_JIRA}/${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN_JIRA) }, //JWT
    });
  };
  delete = (url) => {
    return axios({
      url: `${DOMAIN_CLONE_JIRA}/${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN_JIRA) }, //JWT
    });
  };
  get = (url) => {
    return axios({
      url: `${DOMAIN_CLONE_JIRA}/${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN_JIRA) }, //JWT
    });
  };
}
