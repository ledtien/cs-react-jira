import React from "react";
import axios from "axios";
import { DOMAIN_CLONE_JIRA, TOKEN_JIRA } from "../util/constants/settingSystem";
import { baseService } from "./baseService";

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
  getAllProjects: () => {
    return axios({
      url: `${DOMAIN_CLONE_JIRA}/Project/getAllProject`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN_JIRA) }, //JWT
    });
  },
  updateProject: (projectUpdate) => {
    return axios({
      url: `${DOMAIN_CLONE_JIRA}/Project/updateProject?ProjectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN_JIRA) }, //JWT
    });
  },
};

//modified service for shorter
export class DeleteProjectService extends baseService {
  deleteProject = (id) => {
    return this.delete(`Project/deleteProject?projectId=${id}`);
  };

  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };
}

export const deleteProjectService = new DeleteProjectService();

//getproject detail
export class ProjectDetailService extends baseService {
  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };
}

export const projectDetailService = new ProjectDetailService();

export class ProjectJiraService extends baseService {
  getAllProject = () => {
    return this.get(`Project/getAllProject`);
  };
}

export const projectJiraService = new ProjectJiraService();
