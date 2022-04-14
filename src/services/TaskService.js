import { baseService } from "./baseService";

export class TaskService extends baseService {
  createTask = (taskObject) => {
    return this.post(`Project/createTask`, taskObject);
  };
}

export const taskService = new TaskService();
