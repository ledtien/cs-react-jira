import { baseService } from "./baseService";

export class TaskService extends baseService {
  createTask = (taskObject) => {
    return this.post(`Project/createTask`, taskObject);
  };

  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };

  updateStatusTask = (statusUpdate) => {
    return this.put(`Project/updateStatus`, statusUpdate);
  };
  updateTask = (taskUpdateAPI) => {
    return this.post(`Project/updateTask`, taskUpdateAPI);
  };
}

export const taskService = new TaskService();
