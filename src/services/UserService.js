import { baseService } from "./baseService";

export class UserService extends baseService {
  getUser = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };

  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };

  deleteUserFormProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };

  getUserByProjectId = (projectId) => {
    return this.get(`Users/getUserByProjectId?idProject=${projectId}`);
  };
}

export const userService = new UserService();
